import { useMousePosition } from "../../helpers/useMousePosition";

export default function DraggingIcon() {
  const mousePosition = useMousePosition();
  return (
    <div
      className={`absolute w-[70px] h-[70px] bg-slate-700/50 border-[2px] border-white rounded-[10px] translate-x-[-50%] ${
        mousePosition.x === 0 && "hidden"
      }`}
      style={{ left: mousePosition.x, top: mousePosition.y }}
    ></div>
  );
}
