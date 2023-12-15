import { useState } from "react";
import MappingRow from "../MappingRow/MappingRow";


export default function MappingColumn({ map }) {
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
      >
        { drag.active && <div onMouseMove={resizeFrame} onMouseUp={stopResize} 
            className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-[0.5] z-50"></div>
        }
        <button
            className="float-left w-[10px] h-full border-solid border-white border-l-2"
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
