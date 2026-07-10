# Data models

Sentra Assist moves a lot of structured clinical data through the extension.
This page documents the key types and interfaces that define that data. All
paths are relative to `apps/healthcare/sentra-assistv1/`.

---

## Patient context

### `PatientContext`

**Source:** `lib/store.ts` (line 40)

```typescript
export interface PatientContext {
  patientId: string
  patientName: string
  age: number
  gender: Gender // 'L' | 'P'
  medicalRecordNumber?: string
}
```

The root identity of a patient inside the extension. `PatientContext` is set
when the user opens a patient record in ePuskesmas and the scraper extracts the
demographic banner. It lives in the Zustand store and is persisted to
`browser.storage.local` with a 24-hour TTL.

A second, more detailed `PatientContext` also exists in
`lib/emergency-detector/clinical-snapshot.ts` for emergency-detector use. That
version adds vitals and complaint fields.

---

## Encounter

### `Encounter`

**Source:** `utils/types.ts` (line 90)

```typescript
export interface Encounter {
  id: string;              // pelayanan_id
  patient_id: string;
  timestamp: string;       // ISO datetime
  dokter: { id: string; nama: string; };
  perawat: { id: string; nama: string; };
  anamnesa: { ... };
  diagnosa: { icd_x: string; nama: string; jenis: DiagnosaJenis; kasus: DiagnosaKasus; ... };
  resep: ResepMedication[];
}
```

The canonical encounter record. This type is kept in sync with the dashboard
monorepo source (`app/primaryhealth/dashboard/src/lib/emr/types.ts`). An
encounter represents one visit: anamnesis, diagnosis, and prescription together.
The `id` field is the ePuskesmas `pelayanan_id`.

### `EncounterState`

**Source:** `lib/store.ts` (line 135)

The Zustand store interface that holds the full clinical session: patient
context, anamnesa data, diagnosis recommendations, therapy data, and metadata.
It also tracks loading states (`isScrapingAnamnesa`, `isAnalyzingDiagnosis`,
`isFillingForm`) so the UI can show spinners at the right moments.

---

## Diagnosis result

### `DiagnosisSuggestion`

**Source:** `types/api.ts`

```typescript
export interface DiagnosisSuggestion {
  rank: number
  icd_x: string // e.g., "J06.9"
  nama: string // Indonesian name
  diagnosis_name?: string // English name
  icd10_code?: string // Alias for ICD compatibility
  confidence: number // 0.0 - 1.0
  rationale: string // Clinical reasoning
  reasoning?: string // Alias for rationale
  red_flags?: string[]
  recommended_actions?: string[]
}
```

A single AI-suggested diagnosis. The `icd_x` field is the primary ICD-10 code
used throughout the Indonesian ePuskesmas system. `confidence` is a normalized
score, not a probability. The `rationale` field explains why the engine matched
this disease to the patient's presentation.

### `CDSSEngineResult`

**Source:** `lib/iskandar-diagnosis-engine/engine.ts`

The final output of the Iskandar Diagnosis Engine. It contains:

- `suggestions` — validated diagnosis suggestions
- `red_flags` — hardcoded emergency rules (e.g., stroke, sepsis)
- `alerts` — clinical decision support alerts for the UI
- `processing_time_ms` — total pipeline latency
- `source` — `'ai'`, `'local'`, or `'error'`
- `model_version` — version string of the engine or LLM used
- `validation_summary` — counts of raw vs. validated suggestions

---

## CDSS alert

### `CDSSAlert`

**Source:** `types/api.ts`

```typescript
export interface CDSSAlert {
  id: string
  type: CDSSAlertType
  severity: AlertSeverity // 'emergency' | 'high' | 'medium' | 'low' | 'info'
  title: string
  message: string
  icd_codes?: string[]
  action?: string
}
```

A clinical alert rendered in the UI. Types include `red_flag`, `ddi`, `dosing`,
`guideline`, `vital_sign`, and others. The `severity` field drives the color and
urgency of the alert banner. `action` is an optional recommended next step
(e.g., "Consider referral").

---

## Traffic light result

### `TrafficLightOutput`

**Source:** `lib/iskandar-diagnosis-engine/traffic-light.ts`

```typescript
export interface TrafficLightOutput {
  level: TrafficLightLevel // 'GREEN' | 'YELLOW' | 'RED'
  reason: string
  gateResults: GateResult[]
  overrideApplied: boolean
}
```

The 8-rule safety gate that runs after symptom matching. `level` is
escalation-only: it can go up, never down. `gateResults` lists which of the 8
rules triggered and why. `overrideApplied` is `true` if any rule changed the
level from its initial `GREEN` state.

The 8 rules cover: KB red flags, referral criteria, low confidence, extreme age
with acute symptoms, no KB match, critical DDI severity, cardiometabolic
cluster, and acute-on-chronic presentation.

---

## Trajectory result

### `HybridTrajectoryResult`

**Source:** `lib/iskandar-diagnosis-engine/hybrid-trajectory.ts` (line 205)

The most complex type in the system. It represents the output of the SYMPHONY
hybrid trajectory engine, which combines physiological trend analysis with
clinical context extraction.

Key fields:

- `physiologicalInput` — array of vital sign snapshots across visits
- `physiologicalResult` — SYMPHONY trajectory analysis (trends, risk,
  deterioration score)
- `clinicalIntelligence` — NEWS2 scoring, early warnings, trajectory signals
- `clinicalContext` — complaint signals, historical diagnosis signals, therapy
  signals, clinician attribution
- `integratedAssessment` — the final calibrated severity and recommended action
- `longitudinalFrames` — per-visit trajectory snapshots for visualization
- `redFlags` — cross-domain red flags (physiological + complaint + history +
  therapy)
- `uncertaintyNotes` and `missingDataWarnings` — transparency about data quality
  limits

This type powers the Clinical Trajectory tab in the side panel.

---

## Bridge and transfer payloads

### `RMETransferPayload`

**Source:** `utils/types.ts`

```typescript
export interface RMETransferPayload {
  anamnesa: AnamnesaFillPayload;
  diagnosa?: DiagnosaFillPayload | null;
  resep?: ResepFillPayload | null;
  options?: { ... };
  meta?: { ... };
}
```

The payload used to auto-fill an ePuskesmas RME form. It contains the complete
anamnesis, diagnosis, and prescription data structured exactly as the ePuskesmas
form expects. The `options` field controls idempotency, step skipping, and
force-run behavior.

### `RMETransferResult`

**Source:** `utils/types.ts`

The result of a transfer operation. It includes a `runId`, `fingerprint`,
`state` (`success` | `partial` | `failed` | `cancelled`), per-step results, and
`reasonCodes` that explain why a step was skipped or failed.

---

## Where to find more

- `types/api.ts` — all API request and response types (diagnosis, prescription,
  DDI, pediatric dosing)
- `types/shared-types.ts` — platform integration types (ePuskesmas bridge
  contracts)
- `lib/store.ts` — Zustand state and action types
- `utils/types.ts` — encounter, fill payload, and transfer types
- `lib/iskandar-diagnosis-engine/validation/types.ts` — validation pipeline
  types
- `lib/iskandar-diagnosis-engine/audit-logger.ts` — audit entry types
