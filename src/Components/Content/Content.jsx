/* eslint-disable react/prop-types */
import React from "react";
// minor components
import AddButtons from "../AddButtons/AddButtons";
// hooks and tools
import { useDispatch } from "react-redux";
import { createElement } from "react";
import { widgets, dndTypes } from "../../layout";
// actions
import { removeWidget, changeLayout } from "../../redux/actions";
// react-dnd
import { useDrag } from "react-dnd";
import DropAreaWidgetColumns from "../DropAreaWidgets/DropAreaColumns/DropAreaWidgetColumns";
import DropAreaWidgetRows from "../DropAreaWidgets/DropAreaRows/DropAreaWidgetRows";

export default function Content({ map }) {
  const dispatch = useDispatch();

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
    <div
      id="Content"
      ref={drag}
      className={`flex ${map.column && "flex-col"} p-2 w-full h-full relative`}
    >
      <div className="absolute top-2 right-0 m-[2px] z-50">
        <AddButtons id={map.id} />
      </div>
      {map.column ? (
        <DropAreaWidgetColumns map={map} position={0} />
      ) : (
        <DropAreaWidgetRows map={map} position={0} />
      )}
      {map.content.map((elem, index) => (
        <React.Fragment key={index}>
          {createElement(widgets[elem.type], {
            id: elem.id,
            parentId: map.id,
            direction: map.column ? "column" : "row",
            onClose: () => dispatch(removeWidget(map.id, elem.id)),
          })}
          {map.column ? (
            <DropAreaWidgetColumns map={map} position={index + 1} />
          ) : (
            <DropAreaWidgetRows map={map} position={index + 1} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
