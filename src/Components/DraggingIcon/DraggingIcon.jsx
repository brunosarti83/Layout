import { useTouchPosition } from "../../helpers/useTouchPosition";

export default function DraggingIcon() {
  const touchPosition = useTouchPosition();
  return (
    <div
      className={`absolute w-[70px] h-[70px] bg-slate-700/50 border-[2px] border-white rounded-[10px] translate-x-[-50%] ${
        touchPosition.x === 0 && "hidden"
      }`}
      style={{ left: touchPosition.x, top: touchPosition.y }}
    ></div>
  );
}
