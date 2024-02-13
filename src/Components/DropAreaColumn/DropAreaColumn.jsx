// hooks and tools
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// actions
import { changeLayout } from "../../redux/actions";

export default function DropAreaRow() {
  const dispatch = useDispatch();
  const isDragging = useSelector((state) => state.isDragging);
  const [isVisible, setIsVisible] = useState(false);

  const mouseEnter = () => {
    setIsVisible(true);
  };

  const mouseLeave = () => {
    setIsVisible(false);
  };

  const onDropRowOrCol = () => {
    dispatch(changeLayout());
  };

  return (
    <div
      onDrop={onDropRowOrCol}
      onDragEnter={mouseEnter}
      onDragLeave={mouseLeave}
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
