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
  //const mainContent = useSelector((state) => state.map.mainContent);
  return (
    <Droppable droppableId={map.id} type="widget">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="flex flex-col gap-2 p-2 w-full"
        >
          <div className="absolute top-2 right-2 m-[2px] z-50">
            <AddButtons />
          </div>
          {map.content.map((elem, index) =>
            createElement(widgets[elem.type], {
              key: elem.id,
              index,
              id: elem.id,
              direction: "row", //make dynamic
              onClose: () => dispatch(removeWidget("row", elem.id)), //make dynamic
            })
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
