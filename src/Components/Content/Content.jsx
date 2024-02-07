/* eslint-disable react/prop-types */
// minor components
import AddButtons from "../AddButtons/AddButtons";
// hooks and tools
import { useDispatch } from "react-redux";
import { createElement } from "react";
import { widgets } from "../../layout";
// actions
import { removeWidget, addWidget } from "../../redux/actions";
// react-beatiful-dnd
import { Droppable } from "react-beautiful-dnd";

export default function Content({ map }) {
  const dispatch = useDispatch();
  return (
    // <div className="flex w-full h-full relative overflow-y-hidden bg-slate-800 bg-opacity-5 rounded-md">
    <Droppable droppableId={map.id} type="widget">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="flex flex-col gap-2 p-2 w-full h-full"
        >
          <div className="absolute top-2 right-0 m-[2px] z-50">
            <AddButtons id={map.id} />
          </div>
          {map.content.map((elem, index) =>
            createElement(widgets[elem.type], {
              key: elem.id,
              index,
              id: elem.id,
              direction: map.column ? "column" : "row",
              onClose: () => dispatch(removeWidget(map.id, elem.id)),
            })
          )}
          {
            // this buttons are just for testing
            !map.a ? (
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
            ) : null
            // en of testing buttons
          }
          {provided.placeholder}
        </div>
      )}
    </Droppable>
    // </div>
  );
}
