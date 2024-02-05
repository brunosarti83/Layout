/* eslint-disable react/prop-types */

// major components
import Unit from "../Unit/Unit";
// hooks and tools
import { useState } from "react";
import { useDispatch } from "react-redux";
// actions
import { addWidget } from "../../redux/actions";
// minor components
import RemoveBtn from "../RemoveBtn/RemoveBtn";

export default function Columns({ nodeA, nodeB }) {
  const dispatch = useDispatch();

  const [drag, setDrag] = useState({
    active: false,
    x: "",
  });

  const [dims, setDims] = useState({
    w: 200,
  });

  const boxStyle = {
    width: `${dims.w}px`,
  };

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
        nodeA.side === "left"
          ? x > e.clientX
            ? Math.max(dims.w - xDiff, 150)
            : dims.w + xDiff
          : x < e.clientX
          ? Math.max(dims.w - xDiff, 150)
          : dims.w + xDiff;

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
      className={`w-full h-full flex gap-1 ${
        nodeA.side !== "left" && "flex-row-reverse"
      } relative`}
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
        className="rounded-md flex flex-col ml-auto h-full relative bg-slate-800 bg-opacity-5"
        style={boxStyle}
      >
        <button
          id="handle"
          className={`w-[10px] h-full border-solid absolute ${
            nodeA.side === "left" ? "right-0" : "left-0"
          } hover:cursor-col-resize`}
          onMouseDown={startResize}
        >
          {}
        </button>
        <Unit map={nodeA} />
        {/* Este bloque de botones no tiene ningun sentido y solo sirve para mostrar que puedo cargar Widgets programaticamente */}
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <button
            onClick={() => dispatch(addWidget(nodeA.id, "purple"))}
            className="w-[100px] h-[30px] bg-gray-400 border-solid border-white border-2"
          >
            Purple
          </button>
          <button
            onClick={() => dispatch(addWidget(nodeA.id, "green"))}
            className="w-[100px] h-[30px] bg-gray-400 border-solid border-white border-2"
          >
            Green
          </button>
        </div>
        {/* ... */}
        {!nodeA.a ? (
          <RemoveBtn target={nodeA.Id} column={nodeA.column} />
        ) : null}
      </div>
      <div className="flex flex-col w-full h-full relative overflow-x-hidden bg-slate-800 bg-opacity-5 rounded-md">
        <Unit map={nodeB} />
        {!nodeB.a ? (
          <RemoveBtn target={nodeB.Id} column={nodeB.column} />
        ) : null}
      </div>
    </div>
  );
}
