/* eslint-disable react/prop-types */
import { useState, createElement } from "react";
import MappingColumn from "../MappingColumn/MappingColumn";
import AddButtons from "../AddButtons/AddButtons";
import { widgets } from "../../layout";

export default function MappingRow({
  map,
  addToLayout,
  removeFromLayout,
  addWidget,
}) {
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
        <div className="w-full h-full flex pl-1 py-2 gap-2 overflow-x-auto overflow-y-hidden">
          {/* Here goes content */}
          {map.insideContent.map((elem, index) =>
            createElement(widgets[elem], { key: index, direction: map.type })
          )}
        </div>
        {/* Este bloque de botones no tiene ningun sentido y solo sirve para mostrar que puedo cargar Widgets programaticamente */}
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <button
            onClick={() => addWidget(map.id, "purple")}
            className="w-[100px] h-[30px] bg-gray-400 border-solid border-white border-2"
          >
            Purple
          </button>
          <button
            onClick={() => addWidget(map.id, "green")}
            className="w-[100px] h-[30px] bg-gray-400 border-solid border-white border-2"
          >
            Green
          </button>
        </div>
        {/* ... */}
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
