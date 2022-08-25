import React from 'react'
import { Rect } from 'react-konva';

export function Rect1() {
  return (
    <Rect
        x={20}
        y={20}
        width={100}
        height={50}
        fill='green'
        stroke='red'
        strokeWidth={4}
    />
  )
}

export function Rect2() {
    return (
        <Rect
            x={150}
            y={40}
            width={100}
            height={50}
            fill='red'
            shadowBlur={10}
            // cornerRadius={10}
            cornerRadius={[0, 10, 20, 30]}
        />
      )   
}
