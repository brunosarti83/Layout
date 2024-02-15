/* eslint-disable react/prop-types */
// minor components
import AddButtons from "../AddButtons/AddButtons";
// hooks and tools
import { useDispatch } from "react-redux";
import { createElement } from "react";
import { widgets, dndTypes } from "../../layout";
// actions
import { removeWidget, addWidget } from "../../redux/actions";
// react-beatiful-dnd
import { Droppable } from "react-beautiful-dnd";
// react-dnd 
import { useDrop } from "react-dnd";

export default function Content({ map }) {
  const dispatch = useDispatch();

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: dndTypes.WIDGET_BOX,
    drop: () => console.log('dropping'),
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  return (
    <Droppable droppableId={map.id} type="widget">
      {(provided, snapshot) => (
        <div
          ref={(el)=> {provided.innerRef(el); drop(el);}}
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
          {
            // this buttons are just for testing
            !map.a ? (
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
            ) : null
            // en of testing buttons
          }
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
