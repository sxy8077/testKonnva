import React, {useEffect, useState, useRef, Fragment} from 'react'
import { Stage, Layer, Rect, Transformer } from 'react-konva';

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = useRef();
    const trRef = useRef();
  
    useEffect(() => {
      if (isSelected) {
        // we need to attach transformer manually
        console.log(trRef.current.getLayer())
        trRef.current.nodes([shapeRef.current]);
        trRef.current.getLayer().batchDraw();
      }
    }, [isSelected]);
  
    return (
      <Fragment>
        <Rect
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          {...shapeProps}
          draggable
          onDragEnd={(e) => {
            onChange({
              ...shapeProps,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          onTransformEnd={(e) => {
            // transformer is changing scale of the node
            // and NOT its width or height
            // but in the store we have only width and height
            // to match the data better we will reset scale on transform end
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
  
            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              // set minimal value
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(5, node.height() * scaleY),
            });
          }}
        />
        {isSelected && (
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
                // console.log(oldBox, newBox)
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}
      </Fragment>
    );
};
  
  const initialRectangles = [
    {
      x: 10,
      y: 10,
      width: 100,
      height: 100,
      fill: 'red',
      id: 'rect1',
    },
    {
      x: 150,
      y: 150,
      width: 100,
      height: 100,
      fill: 'green',
      id: 'rect2',
    },
  ];

function TransFormerDemo() {
    const [rectangles, setRectangles] = useState(initialRectangles);
    const [selectedId, selectShape] = useState(null);
  
    const checkDeselect = (e) => {
      // deselect when clicked on empty area
    //   console.log(e)
      const clickedOnEmpty = e.target === e.target.getStage();
      if (clickedOnEmpty) {
        selectShape(null);
      }
    };
  
    return (
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          {rectangles.map((rect, i) => {
            return (
              <Rectangle
                key={i}
                shapeProps={rect}
                isSelected={rect.id === selectedId}
                onSelect={() => {
                  selectShape(rect.id);
                }}
                onChange={(newAttrs) => {
                  const rects = rectangles.slice();// 重新赋值一个新数组 和原数组一样 但地址不同
                  rects[i] = newAttrs;
                  setRectangles(rects);
                }}
              />
            );
          })}
        </Layer>
      </Stage>
    );
}

export default TransFormerDemo
