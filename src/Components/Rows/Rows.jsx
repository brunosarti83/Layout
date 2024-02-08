/* eslint-disable react/prop-types */

// major components
import Unit from "../Unit/Unit";
// hooks and tools
import { useEffect, useState, useRef } from "react";
// minor components
import RemoveBtn from "../RemoveBtn/RemoveBtn";

export default function Rows({ nodeA, nodeB }) {
  const [drag, setDrag] = useState({
    active: false,
    y: "",
  });

  const [dims, setDims] = useState({
    h: null,
  });

  const boxStyle = {
    height: dims.h ? `${dims.h}px` : '100%'
  };

  const refA = useRef(null)

  useEffect(() => {
    setDims({...dims, h: refA.current.parentElement.offsetHeight})
  }, [])

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

  return (
    <div
      id="wrapperForTwoRows"
      className="w-full h-full flex flex-col relative"
      >
      {drag.active && (
        <div
        onMouseMove={resizeFrame}
        onMouseUp={stopResize}
        className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-[0.5] z-50"
        ></div>
        )}
      <div
        id="rowA"
        ref={refA}
        className={`${
          !nodeA.a && "bg-slate-800 bg-opacity-5"
        } flex w-full rounded-md relative overflow-y-hidden`}
        style={boxStyle}
      >
        <Unit map={nodeA} />
        {!nodeA.a ? (
          <RemoveBtn target={nodeA.Id} column={nodeA.column} />
        ) : null}
      </div>
      <div className="h-1 relative">
        <button
          id="handle"
          className="w-full h-1 absolute bottom-0 hover:cursor-row-resize"
          onMouseDown={startResize}
        >
          {}
        </button>
      </div>
      <div
        className={`flex w-full h-full relative overflow-y-hidden ${
          !nodeB.a && "bg-slate-800 bg-opacity-5"
        } rounded-md`}
      >
        <Unit map={nodeB} />
        {!nodeB.a ? (
          <RemoveBtn target={nodeB.Id} column={nodeB.column} />
        ) : null}
      </div>
    </div>
  );
}
