import { useState } from "react";

export default function Column() {
  const [drag, setDrag] = useState({
    active: false,
    x: "",
    //y: "",
  });

  const [dims, setDims] = useState({
    w: 200,
    //h: 200,
  });

  const boxStyle = {
    width: `${dims.w}px`,
    //height: `${dims.h}px`,
  };

  const startResize = (e) => {
    setDrag({
      active: true,
      x: e.clientX,
      //y: e.clientY,
    });
  };

  const resizeFrame = (e) => {
    const { active, x } = drag;
    if (active) {
      const xDiff = Math.abs(x - e.clientX);
      //const yDiff = Math.abs(y - e.clientY);
      const newW = x < e.clientX ? dims.w - xDiff : dims.w + xDiff;
      //const newH = y > e.clientY ? dims.h + yDiff : dims.h - yDiff;

      setDrag({ ...drag, x: e.clientX });
      setDims({ w: newW });
    }
  };

  const stopResize = () => {
    setDrag({ ...drag, active: false });
  };

  return (
    <div
      className="bg-slate-600 flex flex-col ml-auto h-full"
      style={boxStyle}
      onMouseMove={resizeFrame}
      onMouseUp={stopResize}
    >
      <button
        className="float-left h-full w-[10px] bg-gray-200"
        onMouseDown={startResize}
      >
        {"<"}
      </button>
    </div>
  );
}
