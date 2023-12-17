/* eslint-disable react/prop-types */
import { useState } from "react";
import MappingRow from "../MappingRow/MappingRow";
import AddButtons from "../AddButtons/AddButtons";

export default function MappingColumn({ map, addToLayout, removeFromLayout }) {
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
      const newW = x < e.clientX ? dims.w - xDiff : dims.w + xDiff;

      setDrag({ ...drag, x: e.clientX });
      setDims({ w: newW });
    }
  };

  const stopResize = () => {
    setDrag({ ...drag, active: false });
  };

  return (
    <div className="w-full h-full flex flex-row-reverse relative">
      {drag.active && (
        <div
          onMouseMove={resizeFrame}
          onMouseUp={stopResize}
          className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-[0.5] z-50"
        ></div>
      )}
      <div
        className="bg-slate-600 flex flex-col ml-auto h-full relative"
        style={boxStyle}
      >
        <button
          className="float-left w-[10px] h-full border-solid border-white border-l-2 absolute left-0"
          onMouseDown={startResize}
        >
          {}
        </button>
        <div className="w-full h-full flex flex-col flex-wrap pt-1 px-2 gap-2">
          <div className="w-full h-[200px] bg-purple-500 rounded-[20px]"></div>
          <div className="w-full h-[200px] bg-purple-500 rounded-[20px]"></div>
          <div className="w-full h-[200px] bg-purple-500 rounded-[20px]"></div>
          <div className="w-full h-[100px] bg-sky-500 rounded-[20px]"></div>
          <div className="w-full h-[150px] bg-emerald-500 rounded-[20px]"></div>
        </div>
        <button
          onClick={() => removeFromLayout(map.id)}
          className="text-gray-100 w-full mt-auto bg-red-400 ml-auto"
        >
          remove
        </button>
      </div>
      <div className="flex w-full h-full relative">
        {!map.next && (
          <div className="absolute top-0 right-0 m-[2px]">
            <AddButtons addToLayout={addToLayout} />
          </div>
        )}
        {map?.next?.type === "row" ? (
          <MappingRow
            map={map.next}
            addToLayout={addToLayout}
            removeFromLayout={removeFromLayout}
          />
        ) : (
          map?.next?.type === "column" && (
            <MappingColumn
              map={map.next}
              addToLayout={addToLayout}
              removeFromLayout={removeFromLayout}
            />
          )
        )}
      </div>
    </div>
  );
}
