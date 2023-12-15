import { useState } from "react";

export default function Row({ children }) {
  const [drag, setDrag] = useState({
    active: false,
    y: "",
  });

  const [dims, setDims] = useState({
    h: 200,
  });

  const boxStyle = {
    height: `${dims.h}px`,
  };

  const startResize = (e) => {
    setDrag({
      active: true,
      y: e.clientY,
    });
  };

  const resizeFrame = (e) => {
    const { active, y } = drag;
    if (active) {
      const yDiff = Math.abs(y - e.clientY);
      const newH = y < e.clientY ? dims.h + yDiff : dims.h - yDiff;

      setDrag({ ...drag, y: e.clientY });
      setDims({ h: newH });
    }
  };

  const stopResize = () => {
    setDrag({ ...drag, active: false });
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div
        className="bg-slate-600 flex mb-auto w-full"
        style={boxStyle}
        onMouseMove={resizeFrame}
        onMouseUp={stopResize}
      >
        <button
          className="mt-auto w-full min-h-[10px] p-0 bg-gray-200"
          onMouseDown={startResize}
        >
          {"v"}
        </button>
      </div>
      <div className="flex w-full h-full">{children && children}</div>
    </div>
  );
}
