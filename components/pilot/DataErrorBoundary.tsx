'use client'

import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: string | null
}

export default class DataErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error.message }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="border border-signal p-8 bg-paper mt-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
              Data Ingestion Error
            </span>
            <p className="font-display text-[15px] mt-3 text-ink leading-relaxed">
              {this.state.error ?? 'Failed to load flight logbook data.'}
            </p>
            <button
              onClick={this.handleReset}
              className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em]
                         px-4 py-2 bg-ink text-paper hover:bg-signal-deep
                         transition-colors duration-300"
            >
              Retry
            </button>
          </div>
        )
      )
    }
    return this.props.children
  }
}
