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
      <div id="gap" className="h-full relative">
        <button
          id="resizeHandle"
          className="max-md:w-[12px] max-md:h-[50px] max-md:rounded-md bg-gray-200 max-md:drop-shadow-md md:w-1 md:h-full md:bg-transparent hover:cursor-col-resize shrink-0 max-md:absolute max-md:top-[50%] max-md:left-[50%] max-md:translate-x-[-40%] max-md:translate-y-[-50%] z-50"
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
