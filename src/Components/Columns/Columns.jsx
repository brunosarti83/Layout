/* eslint-disable react/prop-types */

// major components
import Unit from "../Unit/Unit";
// hooks and tools
import { useState, useEffect, useRef } from "react";

export default function Columns({ nodeA, nodeB }) {
  const [drag, setDrag] = useState({
    active: false,
    x: "",
  });

  const [dims, setDims] = useState({
    w: null,
  });

  const boxStyle = {
    width: dims.w ? `${dims.w}px` : "50%",
  };

  const refA = useRef(null);

  useEffect(() => {
    setDims({ ...dims, w: refA.current.parentElement.offsetWidth / 2 });
  }, []);

  const startResize = (e) => {
    setDrag({
      active: true,
      x: e.clientX ?? e.touches[0].clientX,
    });
  };

  const resizeFrame = (e) => {
    const { active, x } = drag;
    const clientX = e.clientX ?? e.touches[0].clientX;
    if (active) {
      const xDiff = Math.abs(x - clientX);
      const newW = x < clientX ? Math.max(dims.w - xDiff, 50) : dims.w + xDiff;

      setDrag({ ...drag, x: clientX });
      setDims({ w: newW });
    }
  };

  const stopResize = () => {
    setDrag({ ...drag, active: false });
  };

  return (
    <div
      id="wrapperForTwoColumns"
      className="w-full h-full flex gap-0 flex-row-reverse relative overflow-y-hidden"
    >
      {drag.active && (
        <div
          id="resizeCover"
          onMouseMove={resizeFrame}
          onMouseUp={stopResize}
          className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-[0.5] z-50"
          style={{ touchAction: "none", userSelect: "none" }}
        ></div>
      )}
      <div
        id="columnA"
        ref={refA}
        className="rounded-md flex flex-col gap-0 h-full relative overflow-x-hidden"
        style={boxStyle}
      >
        <Unit map={nodeA} />
      </div>
      <div id="gap" 
        onMouseDown={startResize}
        onMouseUp={stopResize}
        className="h-full w-[1px] relative border-l-[1px] hover:cursor-col-resize"
        >
        <button
          id="resizeHandle"
          className="w-[12px] h-[24px] bg-gray-400 rounded-[2px] drop-shadow-md hover:cursor-col-resize shrink-0 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50"
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
        id="columnB"
        className="flex flex-col gap-0 h-full relative overflow-x-hidden rounded-md"
        style={{
          width: `calc(100% - ${dims.w}px)`,
          minWidth: 50,
        }}
      >
        <Unit map={nodeB} />
      </div>
    </div>
  );
}
