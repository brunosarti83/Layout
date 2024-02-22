/* eslint-disable react/prop-types */

// major components
import Unit from "../Unit/Unit";
// hooks and tools
import { useEffect, useState, useRef } from "react";

export default function Rows({ nodeA, nodeB }) {
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
      y: e.clientY ?? e.touches[0].clientY,
    });
  };

  const resizeFrame = (e) => {
    const { active, y } = drag;
    const clientY = e.clientY ?? e.touches[0].clientY;
    if (active) {
      const yDiff = Math.abs(y - clientY);
      const newH = y < clientY ? dims.h + yDiff : Math.max(dims.h - yDiff, 50);

      setDrag({ ...drag, y: clientY });
      setDims({ h: newH });
    }
  };

  const stopResize = () => {
    setDrag({ ...drag, active: false });
  };

  return (
    <div
      id="wrapperForTwoRows"
      className="w-full h-full flex flex-col relative gap-0 overflow-x-hidden"
    >
      {drag.active && (
        <div
          onMouseMove={resizeFrame}
          onMouseUp={stopResize}
          className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-[0.5] z-50"
          style={{ touchAction: "none", userSelect: "none" }}
        ></div>
      )}
      <div
        id="rowA"
        ref={refA}
        className="flex gap-0 w-full rounded-md relative overflow-y-hidden"
        style={boxStyle}
      >
        <Unit map={nodeA} />
      </div>
      <div
        id="gap" 
        onMouseDown={startResize}
        onMouseUp={stopResize}
        className="w-full h-[1px] relative border-t-[1px] hover:cursor-row-resize">
        <button
          id="handle"
          className="h-[12px] w-[24px] bg-gray-400 rounded-[2px] drop-shadow-md hover:cursor-row-resize shrink-0 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50"
          onMouseDown={startResize}
          onMouseUp={stopResize}
          onTouchStart={startResize}
          onTouchMove={resizeFrame}
          onTouchEnd={stopResize}
          style={{ touchAction: "none", userSelect: "none" }}
        >
          {}
        </button>
      </div>
      <div
        id="rowB"
        className="flex gap-0 w-full relative overflow-y-hidden rounded-md"
        style={{ height: `calc(100% - ${dims.h}px)`, minHeight: 50 }}
      >
        <Unit map={nodeB} />
      </div>
    </div>
  );
}
