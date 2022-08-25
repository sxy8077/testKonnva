import React, { useRef, useEffect } from 'react'
import { Line } from 'react-konva'

export function RedLine() {
    const LineRef = useRef();

    useEffect(() => {
        LineRef.current.move({x: 0, y: 10}) //相对位移
    }, [])

    return (
        <Line
            ref={LineRef}
            points={[300,300, 400, 400]}
            stroke='red'
            strokeWidth={15}
            lineCap='round'
            lineJoin='round'
        />
    )
}

export function GreenLine() {
    const LineRef = useRef()

    useEffect(() => {
        LineRef.current.move({x: 0, y: 40})
    },[])

    return (
        <Line
            ref={LineRef}
            points={[300,300, 400, 400]}
            stroke='green'
            strokeWidth={2}
            lineJoin='round'
            //长度为33 px的         线段         *间距为10 px 
            dash={[33, 10]}
        />
    )
}
