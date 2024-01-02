import { Draggable } from "react-beautiful-dnd";

/* eslint-disable react/prop-types */
export default function Purple({ id, index, direction, onClose }) {
  const styles = {
    width:
      direction === "column" ? "100%" : direction === "row" ? "250px" : "100%",
    height:
      direction === "column" ? "250px" : direction === "row" ? "100%" : "",
  };
  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ ...styles, ...provided.draggableProps.style, viewTransitionName: 'name-'+id }} //nuevo
          className="bg-purple-500 rounded-[20px] flex-shrink-0 flex flex-col"
        >
          <p className="m-auto">Purple Content</p>
          <button
            type="button"
            onClick={onClose}
            className="m-auto p-2 bg-gray-400 border-[1px] border-solid border-gray-700"
          >
            Close
          </button>
        </div>
      )}
    </Draggable>
  );
}
