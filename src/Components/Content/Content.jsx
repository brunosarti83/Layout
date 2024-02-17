/* eslint-disable react/prop-types */
// minor components
import AddButtons from "../AddButtons/AddButtons";
// hooks and tools
import { useDispatch } from "react-redux";
import { createElement } from "react";
import { widgets, dndTypes } from "../../layout";
// actions
import { removeWidget, addWidget, changeLayout } from "../../redux/actions";
// react-beatiful-dnd
import { Droppable } from "react-beautiful-dnd";
// react-dnd
import { useDrop, useDrag } from "react-dnd";

export default function Content({ map }) {
  const dispatch = useDispatch();

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: dndTypes.WIDGET_BOX,
    drop: (item) => dispatch(addWidget(map.id, item.widget)),
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  // const onDropRowOrCol = () => {
  //   dispatch(changeLayout(mapId, position, isDragging));
  //   dispatch(setDragging(null));
  // };

  const [{ isDragging }, drag] = useDrag(() => ({
    // drag & dragPreview are Refs: [ ..., drag, dragPreview] = useDrag()
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: dndTypes.LAYOUT,
    item: { dragId: map.id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        dispatch(
          changeLayout(dropResult.dropId, dropResult.position, item.dragId)
        );
      }
    },
    // The collect function utilizes a "monitor" instance
    // to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    // <div ref={drag}>
    <Droppable droppableId={map.id} type="widget">
      {(provided, snapshot) => (
        <div
          ref={(el) => {
            provided.innerRef(el);
            drop(el);
            drag(el);
          }}
          {...provided.droppableProps}
          className={`flex ${
            map.column && "flex-col"
          } gap-2 p-2 w-full h-full relative`}
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
          {provided.placeholder}
        </div>
      )}
    </Droppable>
    // </div>
  );
}
