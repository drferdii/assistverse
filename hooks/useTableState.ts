// hooks/useTableState.ts

'use client'

import { useReducer } from 'react'
import type { TableState, TableAction } from '@/types/pilot'

const DEFAULT_PAGE_SIZE = 10

const initial: TableState = {
  sortKey: 'date',
  sortDir: 'desc',
  filter: '',
  page: 0,
  pageSize: DEFAULT_PAGE_SIZE,
}

function reducer(state: TableState, action: TableAction): TableState {
  switch (action.type) {
    case 'SORT':
      return {
        ...state,
        sortDir: state.sortKey === action.key && state.sortDir === 'asc' ? 'desc' : 'asc',
        sortKey: action.key,
        page: 0,
      }
    case 'FILTER':
      return { ...state, filter: action.value, page: 0 }
    case 'PAGE':
      return { ...state, page: Math.max(0, action.page) }
    case 'RESET':
      return initial
    default:
      return state
  }
}

export function useTableState() {
  return useReducer(reducer, initial)
}
