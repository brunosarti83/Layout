/* eslint-disable react/prop-types */
// hooks and tools
// react-dnd
import { useDrop } from "react-dnd";
import { dndTypes } from "../../../layout";

export default function DropAreaWidgetRows({ map, position }) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: [dndTypes.WIDGET, dndTypes.WIDGET_BOX],
    drop: () => ({ dropId: map.id, position }),
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      id="dropAreaWidgetColumn"
      ref={drop}
      className={`h-full relative transition-all duration-75 self-start ${
        position === map.content.length
          ? isOver && canDrop
            ? "w-full before:bg-slate-300/50 before:absolute before:inset-2 before:rounded-md before:border-white before:border-[1px] shrink-0"
            : "w-full min-h-[8px]"
          : isOver && canDrop
          ? "w-[200px] before:bg-slate-300/50 before:absolute before:inset-2 before:rounded-md before:border-white before:border-[1px] shrink-0"
          : "w-[8px] shrink-0"
      } ${canDrop && "border-slate-300 border-[1px] border-dashed mx-[1px]"}`}
    ></div>
  );
}
