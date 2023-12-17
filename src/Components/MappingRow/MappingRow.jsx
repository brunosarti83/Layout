/* eslint-disable react/prop-types */
import { useState } from "react";
import MappingColumn from "../MappingColumn/MappingColumn";
import AddButtons from "../AddButtons/AddButtons";

export default function MappingRow({ map, addToLayout, removeFromLayout }) {
  const [drag, setDrag] = useState({
    active: false,
    y: "",
  });

  const [dims, setDims] = useState({
    h: 200,
  });

  const boxStyle = {
    height: `${dims.h}px`,
  };

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
      const newH = y < e.clientY ? dims.h + yDiff : dims.h - yDiff;

      setDrag({ ...drag, y: e.clientY });
      setDims({ h: newH });
    }
  };

  const stopResize = () => {
    setDrag({ ...drag, active: false });
  };

  return (
    <div className="w-full h-full flex flex-col relative">
      {drag.active && (
        <div
          onMouseMove={resizeFrame}
          onMouseUp={stopResize}
          className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-[0.5] z-50"
        ></div>
      )}
      <div
        className="bg-slate-600 flex mb-auto w-full relative"
        style={boxStyle}
      >
        <button
          className="w-full h-[10px] border-solid border-white border-b-2 absolute bottom-0"
          onMouseDown={startResize}
        >
          {}
        </button>
        <div className="w-full h-full flex flex-wrap pl-1 py-2 gap-2">
          <div className="w-[200px] h-full bg-purple-500 rounded-[20px]"></div>
          <div className="w-[150px] h-full bg-sky-500 rounded-[20px]"></div>
          <div className="w-[300px] h-full bg-emerald-500 rounded-[20px]"></div>
        </div>
        <button
          onClick={() => removeFromLayout(map.id)}
          className="text-gray-100 h-full ml-auto bg-red-400"
        >
          <p className="-rotate-90 m-0">remove</p>
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
