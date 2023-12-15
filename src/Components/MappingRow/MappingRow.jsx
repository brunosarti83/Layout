import { useState } from "react";
import MappingColumn from "../MappingColumn/MappingColumn";

export default function MappingRow({ map }) {
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
      >
        { drag.active && <div onMouseMove={resizeFrame} onMouseUp={stopResize} 
            className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-[0.5] z-50"></div>
        }
        <button
          className="mt-auto w-full h-[10px] border-solid border-white border-b-2"
          onMouseDown={startResize}
        >
          {}
        </button>
      </div>
      <div className="flex w-full h-full">{ 
        map?.next?.type === 'row' ? <MappingRow map={map.next} /> : 
            map?.next?.type === 'column' && <MappingColumn map={map.next} />
        }</div> 
    </div>
  );
}
