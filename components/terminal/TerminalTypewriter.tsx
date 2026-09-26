'use client'

import { useTypewriter } from './useTypewriter'
import { clinicalCases } from './cases'
import styles from './TerminalTypewriter.module.css'

interface TerminalTypewriterProps {
  baseSpeed?: number
  loopDelay?: number
  pauseOnHidden?: boolean
}

export default function TerminalTypewriter({
  baseSpeed = 22,
  loopDelay = 3000,
  pauseOnHidden = true,
}: TerminalTypewriterProps) {
  const { visibleBlocks, isFading, cursorVisible, containerRef } = useTypewriter({
    cases: clinicalCases,
    baseSpeed,
    loopDelay,
    pauseOnHidden,
  })

  const renderBlock = (block: (typeof visibleBlocks)[0], index: number) => {
    const { block: b, text, isCurrent } = block

    const content = (
      <>
        {text}
        {isCurrent && <span className={styles.cursor} style={{ opacity: cursorVisible ? 1 : 0 }} />}
      </>
    )

    switch (b.type) {
      case 'header':
        return (
          <div key={index} className={styles.block}>
            <div className={styles.eyebrow}>{content}</div>
          </div>
        )

      case 'input-label':
        return (
          <div key={index} className={styles.block}>
            <div className={styles.inputLabel}>{content}</div>
          </div>
        )

      case 'input-text':
        return (
          <div key={index} className={styles.block}>
            <div className={styles.inputText}>{content}</div>
          </div>
        )

      case 'step':
        return (
          <div key={index} className={`${styles.block} ${styles.step}`}>
            <span className={styles.check}>✓</span>
            {content}
          </div>
        )

      case 'case':
        return (
          <div key={index} className={`${styles.block} ${styles.case}`}>
            {content}
          </div>
        )

      case 'label':
        return (
          <div key={index} className={`${styles.block} ${styles.label}`}>
            {content}
          </div>
        )

      case 'chain-name':
        return (
          <div key={index} className={`${styles.block} ${styles.chainName}`}>
            {content}
          </div>
        )

      case 'chain-sx':
        return (
          <div key={index} className={`${styles.block} ${styles.chainSx}`}>
            <span className={styles.arrow}>→</span>
            {content}
          </div>
        )

      case 'chain-px':
        return (
          <div key={index} className={`${styles.block} ${styles.chainPx}`}>
            {content}
          </div>
        )

      case 'list-item':
        return (
          <li key={index} className={styles.block}>
            {content}
          </li>
        )

      case 'dx-status':
        return (
          <div key={index} className={`${styles.block} ${styles.dxStatus}`}>
            <span className={styles.dxDot} />
            <span className={styles.dxLabel}>{content}</span>
          </div>
        )

      case 'dx-text':
        return (
          <div key={index} className={`${styles.block} ${styles.dxText}`}>
            {content}
          </div>
        )

      case 'footer':
        return (
          <div key={index} className={`${styles.block} ${styles.footer}`}>
            {content}
          </div>
        )

      default:
        return (
          <div key={index} className={styles.block}>
            {content}
          </div>
        )
    }
  }

  // Group list items into a <ul>
  const renderBlocks = () => {
    const elements: React.ReactNode[] = []
    let currentList: (typeof visibleBlocks)[0][] = []

    visibleBlocks.forEach((block, index) => {
      if (block.block.type === 'list-item') {
        currentList.push(block)
      } else {
        // Flush any pending list
        if (currentList.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className={styles.klarList}>
              {currentList.map((item, i) => renderBlock(item, index - currentList.length + i))}
            </ul>
          )
          currentList = []
        }
        elements.push(renderBlock(block, index))
      }
    })

    // Flush remaining list items
    if (currentList.length > 0) {
      elements.push(
        <ul key="list-final" className={styles.klarList}>
          {currentList.map((item, i) =>
            renderBlock(item, visibleBlocks.length - currentList.length + i)
          )}
        </ul>
      )
    }

    return elements
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.terminal} ${isFading ? styles.fading : ''}`}
      style={
        {
          '--ink': '#E0DDD5',
          '--ink-soft': '#B8B5AC',
          '--ink-dim': '#9E9C95',
          '--line': '#3D3C39',
          '--gold': '#c9a84c',
          '--green': '#6b9e6b',
          '--orange': '#d49a4a',
        } as React.CSSProperties
      }
    >
      {renderBlocks()}
    </div>
  )
}
