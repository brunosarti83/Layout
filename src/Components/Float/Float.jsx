import { useState } from "react";

export default function Float() {
  const [drag, setDrag] = useState({
    active: false,
    x: "",
    y: "",
  });

  const [dims, setDims] = useState({
    w: 200,
    h: 200,
  });

  const boxStyle = {
    width: `${dims.w}px`,
    height: `${dims.h}px`,
  };

  const startResize = (e) => {
    setDrag({
      active: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const resizeFrame = (e) => {
    const { active, x, y } = drag;
    if (active) {
      const xDiff = Math.abs(x - e.clientX);
      const yDiff = Math.abs(y - e.clientY);
      const newW = x > e.clientX ? dims.w - xDiff : dims.w + xDiff;
      const newH = y > e.clientY ? dims.h + yDiff : dims.h - yDiff;

      setDrag({ ...drag, x: e.clientX, y: e.clientY });
      setDims({ w: newW, h: newH });
    }
  };

  const stopResize = () => {
    setDrag({ ...drag, active: false });
  };

  return (
    <div
      className="bg-yellow-200 h-[90%] w-[90%] flex justify-center items-center"
      onMouseMove={resizeFrame}
      onMouseUp={stopResize}
    >
      <div className="bg-slate-600 flex flex-col" style={boxStyle}>
        <div className="w-full h-[30px] bg-red-200">
          <button
            className="dragger float-right bg-gray-300"
            onMouseDown={startResize}
          >
            Size Me
          </button>
        </div>
      </div>
    </div>
  );
}
