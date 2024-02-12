import { useState } from "react";

export default function DropAreaRow() {
  const [isVisible, setIsVisible] = useState(false);

  const mouseEnter = () => {
    setIsVisible(true);
  };

  const mouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div
      onDragEnter={mouseEnter}
      onDragLeave={mouseLeave}
      className={`h-full relative transition-all duration-75 ${
        isVisible
          ? "w-[200px] before:bg-slate-300/50 before:absolute before:inset-2 before:rounded-md before:border-white before:border-[1px]"
          : "w-[4px] shrink-0"
      }`}
    ></div>
  );
}
