# Clinical trajectory

Clinical trajectory analysis turns isolated visits into a longitudinal picture
of patient health. It looks at the latest five visits, computes trend
directions, risk levels, and deterioration states, then presents them in a
visual format the clinician can read in seconds. Trajectory V2 adds risk curves,
signal coverage lanes, visit-delta panels, and clinical reasoning integration.

## Purpose

A single visit tells the clinician what is happening today. The trajectory tells
them what has been happening over the past weeks or months. This is especially
valuable for chronic disease management (diabetes, hypertension, COPD) and for
detecting early deterioration before it becomes an emergency.

The module is deterministic. Every trend line, risk score, and recommendation is
traceable to specific vital-sign values and visit records. There is no black-box
prediction.

## Directory layout

```
lib/iskandar-diagnosis-engine/
├── trajectory-analyzer.ts           # Legacy 5-visit deterministic analyzer
├── hybrid-trajectory.ts             # V2 unified engine (physiological + clinical context)
├── clinical-trajectory-intelligence.ts # NEWS2, early warnings, selected patterns
├── symphony-trajectory-core.ts      # Physiological model (momentum, convergence, baselines)
├── trajectory-visualization-view-model.ts # View-model builder for the UI
components/clinical/
├── ClinicalTrajectory.tsx           # Main container component
├── trajectory/
│   ├── TrajectoryVisualizationPanel.tsx
│   ├── charts/
│   │   ├── VitalTrendChart.tsx
│   │   ├── MortalityProxyChart.tsx
│   │   ├── BaselineDeviationChart.tsx
│   │   └── TimeToCriticalChart.tsx
│   └── v2/
│       ├── ClinicalTrajectoryV2.tsx
│       ├── ClinicalTrajectoryChartTabs.tsx
│       ├── ClinicalTrajectoryHeader.tsx
│       ├── ClinicalEvidenceDrawer.tsx
│       ├── ClinicalReasoningDifferentialPanel.tsx
│       ├── TrajectoryRiskCurvePanel.tsx
│       ├── TrajectorySignalCoverageLaneChart.tsx
│       ├── TrajectoryVisitDeltaPanel.tsx
│       └── TrajectoryDiagnosticEvolutionPanel.tsx
```

## Key abstractions

### `TrajectoryAnalysis` (legacy)

The original analyzer output. It contains:

- `overallTrend` — improving, declining, stable, or insufficient_data
- `overallRisk` — low, moderate, high, or critical
- `vitalTrends` — per-parameter trend lines with values, dates, and risk labels
- `global_deterioration` — a state (improving, stable, deteriorating, critical)
  and a score
- `acute_attack_risk_24h` — five risk percentages for the next 24 hours
- `early_warning_burden` — count of vital-sign breaches across the last five
  visits
- `trajectory_volatility` — coefficient-of-variation index and stability label
- `time_to_critical_estimate` — hours until each vital reaches a critical
  threshold
- `mortality_proxy` — a tier (low to very_high) and clinical urgency tier
- `clinical_safe_output` — a risk tier, confidence, drivers, and recommended
  action
- `confirmed_chronic_diagnoses` — diseases extracted from visit ICD-10 codes

### `HybridTrajectoryResult` (V2)

The unified V2 output that combines physiological analysis with clinical
context:

- `physiologicalInput` — the raw vital-sign snapshots from visits
- `physiologicalResult` — the Symphony physiological analysis
- `clinicalIntelligence` — NEWS2 score, early warnings, selected patterns
- `clinicalContext` — complaint signals, historical diagnosis signals, therapy
  signals
- `integratedAssessment` — calibrated severity, final state, confidence,
  recommended action
- `longitudinalFrames` — per-visit summary frames with trend, risk, and red
  flags
- `redFlags` — structured alerts with severity, source, title, and rationale
- `uncertaintyNotes` and `missingDataWarnings` — data-quality transparency

### `TrajectoryVisualizationViewModel`

The UI-facing view model built from `HybridTrajectoryResult`:

- `trajectoryTimeline` — state labels per visit (stable, mild_concern,
  worsening, etc.)
- `vitalTrends` — chart-ready points for each parameter
- `keyDriverContributions` — which factors drove the risk score and by how much
- `baselineDeviation` — how current values deviate from the patient's personal
  baseline
- `mortalityProxy` — tier, score, and urgency for display
- `priorityTrajectoryCoverage` — which of the 12 priority trajectories are
  active
- `timeToCritical` — chart-ready rows for the "hours to critical" projection
- `clinicalTimeline`, `riskTrajectory`, `redFlagTimeline`, `visitToVisitDelta`,
  `diagnosticHypothesisEvolution` — V2 panel data

### `SymphonyTrajectoryAnalysis`

The core physiological model:

- `overallTrend` and `overallRisk` — high-level summary
- `globalDeterioration` — state and score
- `acuteAttackRisk24h` — five acute risk percentages
- `earlyWarningBurden` — breach counts
- `trajectoryVolatility` — stability assessment
- `timeToCriticalEstimate` and `timeToCriticalDetail` — per-parameter
  projections
- `treatmentResponse` — velocity change before/after therapy
- `mortalityProxy` — risk tier and urgency
- `momentum` — momentum level, convergence pattern, and narrative
- `personalBaseline` — mean/median/z-score per vital parameter

## How it works

### Legacy analyzer (V1)

`analyzeTrajectory` in `trajectory-analyzer.ts` takes an array of `VisitRecord`
objects (up to 5) and produces a `TrajectoryAnalysis`.

1. **Filtering** — visits with no usable vitals are discarded.
2. **Trend detection** — for each vital parameter, a linear regression on the
   visit sequence computes a slope. The slope is compared against a
   parameter-specific threshold to classify the trend as improving, declining,
   or stable.
3. **Risk assessment** — the latest value for each parameter is compared against
   `NORMAL_RANGES` and `CRITICAL_THRESHOLDS` to produce a `RiskLevel`.
4. **Global deterioration** — a composite score is computed from the worst risk
   levels and trend directions. The state is mapped to improving, stable,
   deteriorating, or critical.
5. **Acute attack risk** — five 24-hour risk percentages are computed from
   keyword matching (stroke, ACS, respiratory, infectious) and vital-sign
   extremes.
6. **Early warning burden** — counts how many times each vital crossed warning
   thresholds in the last five visits.
7. **Volatility** — coefficient of variation plus sign-flip penalty gives a
   volatility index. Stability is labeled true_stable, pseudo_stable, or
   unstable.
8. **Time to critical** — linear extrapolation from the latest two values to the
   critical threshold, capped at 7 days.
9. **Mortality proxy** — a weighted score from global deterioration, overall
   risk, and acute attack risks.
10. **Chronic diagnoses** — ICD-10 codes from visit history are classified into
    chronic disease types.

### Symphony physiological core (V2)

`analyzeSymphonyTrajectory` in `symphony-trajectory-core.ts` replaces the legacy
analyzer with a more sophisticated model:

- **Personal baseline** — computes mean, median, and z-score for each vital
  parameter from the patient's own history, not population norms.
- **Momentum analysis** — calculates velocity (change per hour) and acceleration
  for each parameter. Classifies momentum into INSUFFICIENT_DATA, STABLE,
  DRIFTING, ACCELERATING, CONVERGING, or CRITICAL_MOMENTUM.
- **Convergence detection** — identifies when multiple parameters worsen
  together (cardiovascular, shock, sepsis-like, respiratory, multi-system).
- **Treatment response** — compares velocity before and after therapy initiation
  to classify response as effective, partially effective, ineffective, or
  worsening.
- **Time to critical** — uses both linear and acceleration-adjusted projections
  for each parameter.

### Clinical trajectory intelligence (V2)

`buildClinicalTrajectoryIntelligence` in `clinical-trajectory-intelligence.ts`
adds clinical context on top of the physiological model:

- **NEWS2** — computes the National Early Warning Score 2 from the latest
  vitals, with COPD-aware SpO2 scaling.
- **Early warning matches** — pattern-based alerts for sepsis early, septic
  shock, shock index, respiratory failure, and ACS.
- **Selected patterns** — gate-driven pattern matching (e.g., GATE_SEPSIS_EARLY,
  GATE_SHOCK_INDEX).
- **Trajectory signals** — 12 signal IDs (T-13, T-25, T-38, etc.) with severity
  and rationale.
- **Shock index** — heart rate / systolic BP ratio with severity classification.

### Hybrid trajectory (V2)

`analyzeHybridTrajectory` in `hybrid-trajectory.ts` merges the physiological and
clinical layers:

1. Runs `analyzeSymphonyTrajectory` on the vital history.
2. Runs `buildClinicalTrajectoryIntelligence` on the latest vitals and complaint
   text.
3. Extracts clinical context: complaint signals, historical diagnosis signals,
   therapy signals.
4. Computes an integrated assessment that calibrates physiological severity
   against the clinical review floor.
5. Builds longitudinal frames for each visit, combining the physiological
   snapshot with the complaint, diagnosis, and therapy summary.
6. Generates red flags from physiological breaches, complaint keywords,
   historical diagnoses, and therapy risks.
7. Produces uncertainty notes and missing-data warnings for transparency.

### Visualization view model

`buildTrajectoryVisualizationViewModel` in
`trajectory-visualization-view-model.ts` transforms the hybrid result into a
UI-ready structure:

- **Timeline** — maps each visit to a state label and color.
- **Vital trends** — extracts chart-ready points for each parameter.
- **Driver contributions** — ranks the factors that drove the integrated risk
  score.
- **Baseline deviation** — compares current values to the personal baseline.
- **Priority trajectory coverage** — checks which of the 12 priority
  trajectories are active, supported, or inactive.
- **Time to critical** — formats the projection data for chart display.
- **Clinical timeline, risk trajectory, red flag timeline, visit-to-visit delta,
  diagnostic hypothesis evolution** — V2-specific panels.

### UI components

`ClinicalTrajectory.tsx` is the main container. It fetches visit history, runs
the hybrid analyzer, and renders either the legacy panel or the V2 workbench
depending on the feature flag.

`ClinicalTrajectoryV2.tsx` renders the V2 workbench:

- Status strip with state, trend, and priority chips
- Header with patient context and summary
- Chart tabs with vital trends, risk curves, signal coverage, and visit deltas
- Review details panel with differential reasoning
- Evidence drawer with canonical clinical engine output
- Audit trail with workflow session ID

The V2 UI uses Framer Motion for clinical lens animations (highlighting the
latest data point, revealing details with staggered opacity). It respects
`prefers-reduced-motion`.

## Integration points

| Consumer             | What it receives                   | How it uses it                                            |
| -------------------- | ---------------------------------- | --------------------------------------------------------- |
| SYMPHONY bridge      | `HybridTrajectoryResult`           | Generates safety alerts when severity is high/critical    |
| RME transfer         | `TrajectoryAnalysis`               | Maps to prognosis and chronic disease flags               |
| Diagnosis engine     | `TrajectoryAnalysis`               | Adds trajectory context to differential reasoning         |
| ClinicalTrajectoryV2 | `TrajectoryVisualizationViewModel` | Renders charts, timelines, and panels                     |
| Dashboard bridge     | `TrajectoryAnalysis`               | Synchronizes trajectory state to the ePuskesmas dashboard |

## Entry points for modification

### Adding a new vital parameter to trajectory analysis

1. Add the parameter to `SymphonyVitalKey` in `symphony-trajectory-core.ts`.
2. Add normal ranges and critical thresholds to `NORMAL_RANGES` and
   `CRITICAL_THRESHOLDS`.
3. Update `VITAL_KEYS` array.
4. Add the parameter to `BASELINE_PARAMETERS` in
   `trajectory-visualization-view-model.ts`.
5. Update the UI charts in `components/clinical/trajectory/charts/` to display
   the new parameter.

### Adding a new priority trajectory

1. Add the ID to `PriorityTrajectoryId` in
   `trajectory-visualization-view-model.ts`.
2. Add a label to `PRIORITY_TRAJECTORY_LABELS`.
3. Add detection logic in `hybrid-trajectory.ts` or
   `clinical-trajectory-intelligence.ts`.
4. Update the coverage check in the view-model builder.

### Changing NEWS2 scoring

Edit the parameter scoring functions in `clinical-trajectory-intelligence.ts`:

- `scoreRespiratoryRate`
- `scoreSpo2Scale1` / `scoreSpo2Scale2`
- `scoreSystolic`
- `scoreHeartRate`
- `scoreTemperature`
- `scoreConsciousness`

Then update `determineNews2RiskLevel` and the monitoring/clinical response
strings.

### Adding a new early warning pattern

Edit `clinical-trajectory-intelligence.ts`:

1. Add a new `ClinicalSelectedPatternId` and `ClinicalSelectedPatternGate`.
2. Add the pattern to the early warning match logic.
3. Update the `selectedPatterns` array in the result.

### Changing the trajectory timeline state labels

Edit `formatOverallTrendLabel` in `trajectory-visualization-view-model.ts`. The
timeline states are:

- stable
- mild_concern
- worsening
- high_concern
- critical_concern

### Modifying the V2 UI layout

The V2 workbench is composed of several sub-components in
`components/clinical/trajectory/v2/`. Each panel is self-contained:

- `ClinicalTrajectoryHeader.tsx` — patient context and summary
- `ClinicalTrajectoryChartTabs.tsx` — tabbed chart container
- `TrajectoryRiskCurvePanel.tsx` — risk curve visualization
- `TrajectorySignalCoverageLaneChart.tsx` — signal coverage lanes
- `TrajectoryVisitDeltaPanel.tsx` — visit-to-visit deltas
- `ClinicalReasoningDifferentialPanel.tsx` — differential reasoning
- `ClinicalEvidenceDrawer.tsx` — evidence and canonical output
- `ClinicalReasoningAuditTrail.tsx` — audit trail

Modify the component you need without touching the others. The parent
`ClinicalTrajectoryV2` passes data via props.

## Related pages

- [Clinical safety](clinical-safety.md) — Vital guardrails that feed
  current-visit data into trajectory analysis
- [RME transfer](rme-transfer.md) — Orchestrator that uses trajectory output for
  prognosis mapping
- [Drug safety](drug-safety.md) — Pharmacotherapy reasoner that can be
  influenced by trajectory trends
- [Systems overview](../systems/index.md) — Architecture documentation for the
  diagnosis engine and feature flags
