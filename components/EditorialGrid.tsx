'use client'
import React from 'react'

const Crosshair: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`absolute w-8 h-8 pointer-events-none flex items-center justify-center ${className}`}
    >
      {/* Horizontal line */}
      <div className="absolute w-full h-[2px] bg-black" />
      {/* Vertical line */}
      <div className="absolute h-full w-[2px] bg-black" />
    </div>
  )
}

export const EditorialGrid: React.FC = () => {
  // 17 columns x 4 rows for the small grid
  const COLS = 17
  const ROWS = 4
  const totalCells = COLS * ROWS

  return (
    <div className="relative w-full min-h-screen bg-white text-black flex items-center justify-center p-8 md:p-16 font-sans">
      {/* Main Bounding Box */}
      <div className="relative w-full max-w-6xl mx-auto border-[1px] border-black grid grid-cols-[17fr_6fr] bg-white">
        {/* The 4 Corner Crosshairs */}
        {/* We center the 32x32px crosshair on the exact corner using -translate-x-1/2 and -translate-y-1/2 */}
        <Crosshair className="top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-10" />
        <Crosshair className="top-0 right-0 translate-x-1/2 -translate-y-1/2 z-10" />
        <Crosshair className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2 z-10" />
        <Crosshair className="bottom-0 right-0 translate-x-1/2 translate-y-1/2 z-10" />

        {/* Top Left Quadrant (Large Empty Space) */}
        {/* Min-height ensures the box has a nice aspect ratio overall */}
        <div className="border-r-[1px] border-b-[1px] border-black min-h-[40vh] md:min-h-[50vh] relative p-8">
          {/* Content can go here */}
        </div>

        {/* Top Right Quadrant */}
        <div className="border-b-[1px] border-black relative p-8">{/* Content can go here */}</div>

        {/* Bottom Left Quadrant (The Dense Grid) */}
        <div
          className="border-r-[1px] border-black grid"
          style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: totalCells }).map((_, i) => {
            const isLastCol = (i + 1) % COLS === 0
            const isLastRow = i >= COLS * (ROWS - 1)

            return (
              <div
                key={i}
                className="aspect-square border-black"
                style={{
                  borderRightWidth: isLastCol ? '0px' : '1px',
                  borderBottomWidth: isLastRow ? '0px' : '1px',
                }}
              />
            )
          })}
        </div>

        {/* Bottom Right Quadrant (Empty Space matching the grid's height) */}
        <div className="relative p-8">{/* Content can go here */}</div>
      </div>
    </div>
  )
}

export default EditorialGrid
