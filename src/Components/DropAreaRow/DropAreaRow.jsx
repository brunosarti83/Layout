/* eslint-disable react/prop-types */

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// actions
import { changeLayout } from "../../redux/actions";

export default function DropAreaRow({ mapId, position }) {
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
  };

  return (
    <div
      onDragOver={dragoverHandler}
      onDrop={onDropRowOrCol}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      className={`w-full relative transition-all duration-75 ${
        isVisible
          ? "h-[200px] before:bg-slate-300/50 before:absolute before:inset-2 before:rounded-xl before:border-white before:border-[1px]"
          : "h-[4px]"
      } ${
        isDragging && "border-slate-300 border-[1px] border-dashed my-[1px]"
      }`}
    ></div>
  );
}
