import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image'

export function Image1({imageUrl, x, y}) {
    const [image] = useImage(imageUrl)
    return (
        <Image image={image} x={x} y={y} />
    )
}
