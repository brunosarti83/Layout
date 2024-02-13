/* eslint-disable react/prop-types */

// major components
import Unit from "../Unit/Unit";
// hooks and tools
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
// actions
import { setDragging } from "../../redux/actions";

export default function Rows({ nodeA, nodeB }) {
  const dispatch = useDispatch();

  const [drag, setDrag] = useState({
    active: false,
    y: "",
  });

  const [dims, setDims] = useState({
    h: null,
  });

  const boxStyle = {
    height: dims.h ? `${dims.h}px` : "50%",
  };

  const refA = useRef(null);

  useEffect(() => {
    setDims({ ...dims, h: refA.current.parentElement.offsetHeight / 2 });
  }, []);

  const startResize = (e) => {
    setDrag({
      active: true,
      y: e.clientY,
    });
  };

  const resizeFrame = (e) => {
    const { active, y } = drag;
    if (active) {
      const yDiff = Math.abs(y - e.clientY);
      const newH =
        y < e.clientY ? dims.h + yDiff : Math.max(dims.h - yDiff, 150);

      setDrag({ ...drag, y: e.clientY });
      setDims({ h: newH });
    }
  };

  const stopResize = () => {
    setDrag({ ...drag, active: false });
  };

  const startDrag = (id) => {
    dispatch(setDragging(id));
  };

  const endDrag = () => {
    dispatch(setDragging(null));
  };

  return (
    <div
      id="wrapperForTwoRows"
      className="w-full h-full flex flex-col relative gap-0"
    >
      {drag.active && (
        <div
          onMouseMove={resizeFrame}
          onMouseUp={stopResize}
          className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-[0.5] z-50"
        ></div>
      )}
      <div
        draggable={nodeA.a ? "false" : "true"}
        onDragStart={() => startDrag(nodeA.id)}
        onDragEnd={endDrag}
        id="rowA"
        ref={refA}
        className="flex w-full rounded-md relative overflow-y-hidden"
        style={boxStyle}
      >
        <Unit map={nodeA} />
      </div>
      <div className="h-1 relative flex-shrink-0">
        <button
          id="handle"
          className="w-full h-1 absolute bottom-0 flex-shrink-0 hover:cursor-row-resize"
          onMouseDown={startResize}
        >
          {}
        </button>
      </div>
      <div
        draggable={nodeB.a ? "false" : "true"}
        onDragStart={() => startDrag(nodeB.id)}
        onDragEnd={endDrag}
        className="flex w-full h-full relative overflow-y-hidden rounded-md"
        style={{ height: `calc(100% - ${dims.h}px)`, minHeight: 150 }}
      >
        <Unit map={nodeB} />
      </div>
    </div>
  );
}
