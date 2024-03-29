/* eslint-disable react/prop-types */
// hooks and tools
// react-dnd
import { useDrop } from "react-dnd";
import { dndTypes } from "../../layout";

export default function DropAreaColumn({ mapId, position }) {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      // The type (or types) to accept - strings or symbols
      accept: dndTypes.LAYOUT,
      drop: () => {
        return { dropId: mapId, position };
      },
      // Props to collect
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [mapId, position]
  );

  return (
    <div
      ref={drop}
      className={`h-full relative transition-all duration-75 ${
        isOver && canDrop
          ? "w-1/2 before:bg-slate-300/50 before:absolute before:inset-2 before:rounded-md before:border-white before:border-[1px]"
          : "w-[4px] shrink-0"
      } ${canDrop && "border-slate-300 border-[1px] border-dashed mx-[1px]"}`}
    ></div>
  );
}
