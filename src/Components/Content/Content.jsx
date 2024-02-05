/* eslint-disable react/prop-types */
// minor components
import AddButtons from "../AddButtons/AddButtons";
// hooks and tools
import { useDispatch } from "react-redux";
import { createElement } from "react";
import { widgets } from "../../layout";
// actions
import { removeWidget } from "../../redux/actions";
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
            <AddButtons />
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
          {provided.placeholder}
        </div>
      )}
    </Droppable>
    // </div>
  );
}
