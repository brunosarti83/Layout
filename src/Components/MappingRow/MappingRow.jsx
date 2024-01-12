/* eslint-disable react/prop-types */

// major components
import MappingColumn from "../MappingColumn/MappingColumn";
// hooks and tools
import { useState, createElement } from "react";
import { useDispatch } from "react-redux";
import { widgets } from "../../layout";
// actions
import { removeFromLayout, addWidget, removeWidget } from "../../redux/actions";
import MainContent from "../MainContent/MainContent";
// react-beatiful-dnd
import { Droppable } from "react-beautiful-dnd";

export default function MappingRow({ map }) {
  const dispatch = useDispatch();
  const [showRemove, setShowRemove] = useState(false);

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
    <div className="w-full h-full flex flex-col relative">
      {drag.active && (
        <div
          onMouseMove={resizeFrame}
          onMouseUp={stopResize}
          className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-[0.5] z-50"
        ></div>
      )}
      <div
        className="bg-slate-800 bg-opacity-5 flex mb-auto w-full rounded-md relative"
        style={boxStyle}
      >
        <button
          id="handle"
          className="w-full h-[10px] border-solid border-white border-b-2 absolute bottom-0 hover:cursor-row-resize"
          onMouseDown={startResize}
        >
          {}
        </button>
        <Droppable droppableId={map.id} direction="horizontal" type="widget">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="w-full h-full flex pl-1 py-2 gap-2 overflow-x-auto overflow-y-hidden"
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
        <div
          className="ml-auto h-full w-[25px] overflow-hidden relative pb-[3px]"
          onMouseEnter={() => setShowRemove(true)}
          onMouseLeave={() => setShowRemove(false)}
        >
          <button
            onClick={() => dispatch(removeFromLayout(map.id))}
            className={
              "text-gray-100 h-full ml-auto bg-red-400 " +
              `relative right-[-25px] transition-all duration-150 ${showRemove ? "translate-x-[-25px]" : null}`
            }
          >
            <p className="-rotate-90 relative right-[15px]">remove</p>
          </button>
        </div>
      </div>
      <div className="flex w-full h-full relative overflow-y-hidden">
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
