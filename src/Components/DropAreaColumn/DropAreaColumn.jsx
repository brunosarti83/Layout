/* eslint-disable react/prop-types */
// hooks and tools
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// actions
import { changeLayout, setDragging } from "../../redux/actions";

export default function DropAreaColumn({ mapId, position }) {
  const dispatch = useDispatch();
  const isDragging = useSelector((state) => state.isDragging);
  const [isVisible, setIsVisible] = useState(false);

  const dragEnter = () => {
    setIsVisible(true);
  };

  const dragLeave = () => {
    setIsVisible(false);
  };

  const dragoverHandler = (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  };

  const onDropRowOrCol = () => {
    dispatch(changeLayout(mapId, position, isDragging));
    setIsVisible(false);
    dispatch(setDragging(null));
  };

  return (
    <div
      onDragOver={dragoverHandler}
      onDrop={onDropRowOrCol}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      className={`h-full relative transition-all duration-75 ${
        isVisible
          ? "w-[200px] before:bg-slate-300/50 before:absolute before:inset-2 before:rounded-md before:border-white before:border-[1px]"
          : "w-[4px] shrink-0"
      } ${
        isDragging && "border-slate-300 border-[1px] border-dashed mx-[1px]"
      }`}
    ></div>
  );
}
