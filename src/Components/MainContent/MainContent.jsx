// minor components
import AddButtons from "../AddButtons/AddButtons";
// hooks and tools
import { useSelector, useDispatch } from "react-redux";
import { createElement } from "react";
import { widgets } from "../../layout";
// actions
import { removeWidget } from "../../redux/actions";
// react-beatiful-dnd
import { Droppable } from "react-beautiful-dnd";

export default function MainContent() {
  const dispatch = useDispatch();
  const mainContent = useSelector((state) => state.map.mainContent);
  return (
    <Droppable droppableId="main" type="widget">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="flex flex-wrap gap-2 p-2"
        >
          <div className="absolute top-0 right-0 m-[2px]">
            <AddButtons />
          </div>
          {mainContent.map((elem, index) =>
            createElement(widgets[elem.type], {
              key: elem.id,
              index,
              id: elem.id,
              direction: "main",
              onClose: () => dispatch(removeWidget("main", elem.id)),
            })
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
