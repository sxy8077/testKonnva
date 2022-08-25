import React, {useState} from 'react'
import { Stage, Layer, Rect, Text } from 'react-konva';

let history = [
    {x: 20, y: 20}
];
let historyStep = 0;

function UndoAndRedo() {
    const [position, setPosition] = useState(history[0]);


    const handleDragEnd = (e) => {
        history = history.slice(0, historyStep + 1);
        const pos = {
          x: e.target.x(),
          y: e.target.y(),
        };
        history = history.concat([pos]);
        historyStep ++;
        setPosition(pos)
    };

    // 撤销
    const handleUndo = () => {
        if (historyStep === 0) {
          return;
        }
        historyStep --;
        const previous = history[historyStep];
        setPosition(previous)
    };

    // 恢复
    const handleRedo = () => {
        // 如果处于数组最后则不回复
        if (historyStep === history.length - 1) {
          return;
        }
        historyStep ++;
        const next = history[historyStep];
        setPosition(next)
    };

    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
                <Text text="undo" onClick={handleUndo} />
                <Text text="redo" x={40} onClick={handleRedo} />
                <Rect
                    x={position.x}
                    y={position.y}
                    width={50}
                    height={50}
                    fill="black"
                    draggable
                    onDragEnd={handleDragEnd}
                />
            </Layer>
        </Stage>
    )
}

export default UndoAndRedo
