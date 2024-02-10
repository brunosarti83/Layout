/* eslint-disable react/prop-types */

// major components
import Unit from "../Unit/Unit";
// hooks and tools
import { useState, useEffect, useRef } from "react";
// minor components
import RemoveBtn from "../RemoveBtn/RemoveBtn";

export default function Columns({ nodeA, nodeB }) {
  const [drag, setDrag] = useState({
    active: false,
    x: "",
  });

  const [dims, setDims] = useState({
    w: null,
  });

  const boxStyle = {
    width: dims.w ? `${dims.w}px` : "100%",
  };

  const refA = useRef(null);

  useEffect(() => {
    setDims({ ...dims, w: refA.current.parentElement.offsetWidth });
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
      const xDiff = Math.abs(x - e.clientX) * 6;
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
      className="w-full h-full flex gap-0 flex-row-reverse relative" // try justify-around or something like that
    >
      {drag.active && (
        <div
          id="dragCover"
          onMouseMove={resizeFrame}
          onMouseUp={stopResize}
          className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-[0.5] z-50"
        ></div>
      )}
      <div
        id="columnA"
        ref={refA}
        className={`rounded-md flex flex-col h-full relative overflow-x-hidden ${
          !nodeA.a && "bg-slate-800 bg-opacity-5"
        }`}
        style={boxStyle}
      >
        <Unit map={nodeA} />
        {!nodeA.a ? (
          <RemoveBtn targetId={nodeA.id} column={nodeA.column} />
        ) : null}
      </div>
      <div id="gap" className="w-1 relative flex-shrink-0">
        <button
          id="handle"
          className="w-1 h-full absolute hover:cursor-col-resize flex-shrink-0"
          onMouseDown={startResize}
        >
          {}
        </button>
      </div>
      <div
        className={`flex flex-col w-full h-full relative overflow-x-hidden ${
          !nodeB.a && "bg-slate-800 bg-opacity-5"
        } rounded-md`}
      >
        <div className="overflow-hidden">
          <Unit map={nodeB} />
        </div>
        {!nodeB.a ? (
          <RemoveBtn targetId={nodeB.id} column={nodeB.column} />
        ) : null}
      </div>
    </div>
  );
}
