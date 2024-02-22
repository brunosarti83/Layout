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
      <div className="w-full relative">
        <button
          id="handle"
          className="max-md:h-[12px] max-md:w-[50px] max-md:rounded-lg bg-gray-200 max-md:drop-shadow-md md:h-1 md:w-full md:bg-transparent hover:cursor-row-resize shrink-0 max-md:absolute max-md:top-[50%] max-md:left-[50%] max-md:translate-x-[-50%] max-md:translate-y-[-70%] z-50"
          onMouseDown={startResize}
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
