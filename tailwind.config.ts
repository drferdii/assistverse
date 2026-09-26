import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        'ink-bg': 'var(--ink-bg)',
        paper: 'var(--paper)',
        'paper-pure': 'var(--paper-pure)',
        'paper-on-ink': 'var(--paper-on-ink)',
        'paper-soft-on-ink': 'var(--paper-soft-on-ink)',
        line: 'var(--line)',
        'line-dark': 'var(--line-dark)',
        signal: 'var(--signal)',
        'signal-deep': 'var(--signal-deep)',
        'signal-on-ink': 'var(--signal-on-ink)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        editorial: ['var(--font-editorial)'],
        mono: ['var(--font-mono)'],
      },
      maxWidth: {
        page: 'var(--page-max)',
      },
      spacing: {
        gutter: 'var(--gutter)',
        'row-pad': 'var(--row-pad)',
      },
      animation: {
        rise: 'rise 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'dot-in': 'dot-in 700ms cubic-bezier(0.16, 1, 0.3, 1) 900ms forwards',
        cue: 'cue 1200ms cubic-bezier(0.16, 1, 0.3, 1) 2400ms forwards',
        nudge: 'nudge 2200ms ease-in-out 3600ms infinite',
        pulse: 'pulse 1600ms cubic-bezier(0.4, 0, 0.2, 1) 1700ms 1',
        'pulse-dark': 'pulse-dark 1600ms cubic-bezier(0.4, 0, 0.2, 1) 1400ms 1',
        'dot-pulse': 'dot-pulse 2400ms cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'fade-in': 'fade-in 500ms ease-out both',
        'fade-up': 'fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      keyframes: {
        rise: { to: { opacity: '1', transform: 'translateY(0)' } },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'dot-in': { to: { opacity: '1', transform: 'scale(1)' } },
        cue: { to: { opacity: '0.6' } },
        nudge: {
          '0%, 100%': { transform: 'scaleY(1)', transformOrigin: 'top', opacity: '0.6' },
          '50%': { transform: 'scaleY(1.3)', opacity: '1' },
        },
        pulse: {
          '0%': { boxShadow: '0 0 0 0 rgba(226, 85, 59, 0.45)' },
          '70%': { boxShadow: '0 0 0 14px rgba(226, 85, 59, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(226, 85, 59, 0)' },
        },
        'pulse-dark': {
          '0%': { boxShadow: '0 0 0 0 rgba(240, 119, 94, 0.55)' },
          '70%': { boxShadow: '0 0 0 22px rgba(240, 119, 94, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(240, 119, 94, 0)' },
        },
        'dot-pulse': {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.6)' },
        },
      },
    },
  },
  plugins: [typography],
}

export default config
