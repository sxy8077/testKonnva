import React from 'react'
import { Stage, Layer } from 'react-konva';
import { Rect1, Rect2 } from './demo/Shapes/rect';
import { Circle1 } from './demo/Shapes/Circle';
import { RedLine, GreenLine } from './demo/Shapes/Line';
import { Image1 } from './demo/Shapes/Image';
import pic from '../static/pic.webp'

export default function KonnvaStage() {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
            <Rect1/>
            <Rect2/>
            <Circle1/>
            <RedLine/>
            <GreenLine/>
            <Image1 imageUrl={pic} x={450}/>
        </Layer>
    </Stage>
  )
}
