import { Draggable } from "react-beautiful-dnd";

/* eslint-disable react/prop-types */
export default function Purple({ id, index, direction, onClose }) {
  const styles = {
    width:
      direction === "column" ? "100%" : direction === "row" ? "250px" : "300px",
    height:
      direction === "column" ? "250px" : direction === "row" ? "100%" : "300px",
  };
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={styles}
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
