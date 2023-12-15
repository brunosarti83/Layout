import { useState } from "react";

export default function Column({ children }) {
  const [drag, setDrag] = useState({
    active: false,
    x: "",
  });

  const [dims, setDims] = useState({
    w: 200,
  });

  const boxStyle = {
    width: `${dims.w}px`,
  };

  const startResize = (e) => {
    setDrag({
      active: true,
      x: e.clientX,
    });
  };

  const resizeFrame = (e) => {
    const { active, x } = drag;
    if (active) {
      const xDiff = Math.abs(x - e.clientX);
      const newW = x < e.clientX ? dims.w - xDiff : dims.w + xDiff;

      setDrag({ ...drag, x: e.clientX });
      setDims({ w: newW });
    }
  };

  const stopResize = () => {
    setDrag({ ...drag, active: false });
  };

  return (
    <div className="w-full h-full flex flex-row-reverse relative">
      <div
        className="bg-slate-600 flex flex-col ml-auto h-full"
        style={boxStyle}
        onMouseMove={resizeFrame}
        onMouseUp={stopResize}
      >
        <div className="h-full float-left w-[10px] bg-gray-400">
          <button
            className="float-left w-[10px] h-[10px] hover:w-[100px] hover:h-[20px] hover:rounded-full bg-indigo-200 absolute top-[50%] translate-y-[-50%] hover:translate-x-[-50%]"
            onMouseDown={startResize}
          >
            {}
          </button>
        </div>
      </div>
      <div className="flex w-full h-full">{children && children}</div>
    </div>
  );
}
