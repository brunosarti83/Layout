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
      x: e.clientX,
    });
  };

  const resizeFrame = (e) => {
    const { active, x } = drag;
    if (active) {
      const xDiff = Math.abs(x - e.clientX);
      const newW =
        x < e.clientX ? Math.max(dims.w - xDiff, 150) : dims.w + xDiff;

      setDrag({ ...drag, x: e.clientX });
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
      <div id="gap" className="w-1 relative shrink-0">
        <button
          id="resizeHandle"
          className="w-1 h-full absolute hover:cursor-col-resize shrink-0"
          onMouseDown={startResize}
        >
          {}
        </button>
      </div>
      <div
        id="columnB"
        className="flex flex-col gap-0 h-full relative overflow-x-hidden rounded-md"
        style={{ width: `calc(100% - ${dims.w}px)`, minWidth: 150 }}
      >
        <Unit map={nodeB} />
      </div>
    </div>
  );
}
