/* eslint-disable react/prop-types */
import { useState, createElement } from "react";
import MappingRow from "../MappingRow/MappingRow";
import AddButtons from "../AddButtons/AddButtons";
import { widgets } from "../../layout";

export default function MappingColumn({
  map,
  addToLayout,
  removeFromLayout,
  addWidget,
}) {
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
      const newW = x < e.clientX ? Math.max(dims.w - xDiff, 150) : dims.w + xDiff;

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
        <div className="w-full h-full flex flex-col pt-1 px-2 gap-2 overflow-y-auto overflow-x-hidden">
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
          className="text-gray-100 w-full mt-auto bg-red-400 ml-auto"
        >
          remove
        </button>
      </div>
      <div className="flex w-full h-full relative overflow-x-hidden">
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
            addWidget={addWidget}
          />
        ) : (
          map?.next?.type === "column" && (
            <MappingColumn
              map={map.next}
              addToLayout={addToLayout}
              removeFromLayout={removeFromLayout}
              addWidget={addWidget}
            />
          )
        )}
      </div>
    </div>
  );
}
