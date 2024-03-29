/* eslint-disable react/prop-types */

// react-dnd
import { useDrop } from "react-dnd";
import { dndTypes } from "../../layout";

export default function DropAreaRow({ mapId, position }) {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      // The type (or types) to accept - strings or symbols
      accept: dndTypes.LAYOUT,
      drop: (item, monitor) => {
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
      className={`w-full relative transition-all duration-75 ${
        isOver && canDrop
          ? "h-1/2 before:bg-slate-300/50 before:absolute before:inset-2 before:rounded-xl before:border-white before:border-[1px]"
          : "h-[4px] shrink-0"
      } ${canDrop && "border-slate-300 border-[1px] border-dashed my-[1px]"}`}
    ></div>
  );
}
