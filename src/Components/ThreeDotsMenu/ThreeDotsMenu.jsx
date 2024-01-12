import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

function ThreeDotsMenu({ onClose }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="bg-transparent flex">
        <BsThreeDots className="text-lg m-auto text-gray-600" />
      </button>
      <div
        className={`absolute top-[100%] left-[50%] transition-all duration-150 ${
          open ? "opacity-1" : "opacity-0 hidden translate-y-[-20px]"
        }`}
      >
        <button
          onClick={onClose}
          className="w-[200px] py-2 bg-gray-400/80 hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ThreeDotsMenu;
