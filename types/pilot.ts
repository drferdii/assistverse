// types/pilot.ts

export type EncounterType =
  | 'Diagnostik'
  | 'Triage'
  | 'Lab Interpretasi'
  | 'Imaging'
  | 'Resep Review'
  | 'Pertumbuhan Anak'
  | 'ANC'
  | 'Emergency'

export interface Encounter {
  id: string
  date: string
  time: string
  practitioner: string
  role: string
  encounterType: EncounterType
  location: string
  agent: string
  confidence: number
  icd10: string
  description: string
  verified: boolean
  verifiedBy?: string
  source: 'Assist' | 'Sidelab'
  remarks?: string
}

export interface Practitioner {
  name: string
  degree: string
  role: string
  strNumber: string
  strExpiry: string
  totalEncounters: number
}

export interface Kpi {
  label: string
  value: string
  delta: string
  positive: boolean
  spark: string
}

export type TableSortKey = 'date' | 'practitioner' | 'encounterType' | 'location'
export type SortDirection = 'asc' | 'desc'

export interface TableState {
  sortKey: TableSortKey
  sortDir: SortDirection
  filter: string
  page: number
  pageSize: number
}

export type TableAction =
  | { type: 'SORT'; key: TableSortKey }
  | { type: 'FILTER'; value: string }
  | { type: 'PAGE'; page: number }
  | { type: 'RESET' }
