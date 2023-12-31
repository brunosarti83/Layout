/* eslint-disable react/prop-types */

// major components
import MappingRow from "../MappingRow/MappingRow";
// hooks and tools
import { useState, createElement } from "react";
import { useDispatch } from "react-redux";
import { widgets } from "../../layout";
// actions
import { removeFromLayout, addWidget, removeWidget } from "../../redux/actions";
import MainContent from "../MainContent/MainContent";
// react-beatiful-dnd
import { Droppable } from "react-beautiful-dnd";

export default function MappingColumn({ map }) {
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
        map.side === 'left' ? (x > e.clientX ? Math.max(dims.w - xDiff, 150) : dims.w + xDiff) :
        (x < e.clientX ? Math.max(dims.w - xDiff, 150) : dims.w + xDiff)

      setDrag({ ...drag, x: e.clientX });
      setDims({ w: newW });
    }
  };

  const stopResize = () => {
    setDrag({ ...drag, active: false });
  };

  return (
    <div className={`w-full h-full flex ${map.side !== "left" && "flex-row-reverse"} relative`}>
      {drag.active && (
        <div
          id="drag-cover"
          onMouseMove={resizeFrame}
          onMouseUp={stopResize}
          className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-[0.5] z-50"
        ></div>
      )}
      <div
        id="column"
        className="bg-slate-800 bg-opacity-5 rounded-md flex flex-col ml-auto h-full relative"
        style={boxStyle}
      >
        <button
          id="handle"
          className={`w-[10px] h-full border-solid absolute ${map.side === "left" ? "right-0" : "left-0"}`}
          onMouseDown={startResize}
        >
          {}
        </button>
        <Droppable droppableId={map.id} type="widget">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="w-full h-full flex flex-col pt-1 px-2 gap-2 overflow-y-auto overflow-x-hidden"
            >
              {/* Here goes content */}
              {map.insideContent.map((elem, index) =>
                createElement(widgets[elem.type], {
                  direction: map.type,
                  key: elem.id,
                  index,
                  id: elem.id,
                  onClose: () => dispatch(removeWidget(map.id, elem.id)),
                })
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {/* Este bloque de botones no tiene ningun sentido y solo sirve para mostrar que puedo cargar Widgets programaticamente */}
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <button
            onClick={() => dispatch(addWidget(map.id, "purple"))}
            className="w-[100px] h-[30px] bg-gray-400 border-solid border-white border-2"
          >
            Purple
          </button>
          <button
            onClick={() => dispatch(addWidget(map.id, "green"))}
            className="w-[100px] h-[30px] bg-gray-400 border-solid border-white border-2"
          >
            Green
          </button>
        </div>
        {/* ... */}
        <button
          onClick={() => dispatch(removeFromLayout(map.id))}
          className="text-gray-100 w-full mt-auto bg-red-400 ml-auto"
        >
          remove
        </button>
      </div>
      <div className="flex w-full h-full relative overflow-x-hidden">
        {!map.next && <MainContent />}
        {map?.next?.type === "row" ? (
          <MappingRow map={map.next} />
        ) : (
          map?.next?.type === "column" && <MappingColumn map={map.next} />
        )}
      </div>
    </div>
  );
}
