import { useState } from "react";
import { HiOutlineSquaresPlus } from "react-icons/hi2";


export default function AddWidget() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="relative">
      <OpenList setIsOpen={setIsOpen}/>
      { isOpen ? <div className="absolute bg-slate-900/20 w-[300px] h-[500px] rounded-[50px] z-10"></div> : null }
    </div>
  )
}








function OpenList({setIsOpen}) {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div
      className="w-[80px] h-[80px] flex bg-gradient-to-tr from-gray-100/20 to-gray-150/25 drop-shadow-md overflow-hidden relative rounded-full"
      onMouseEnter={() => setShowAdd(true)}
      onMouseLeave={() => setShowAdd(false)}
    >
      <div
        className={`flex h-[70px] w-[70px] rounded-full text-white m-auto drop-shadow-md relative -bottom-[80px] transition-all duration-150 ${
          showAdd ? "translate-y-[-80px]" : ""
        }`}
      >
        <button
        onClick={() => setIsOpen((state) => !state)} 
        className="bg-sky-500 h-full w-full rounded-full flex">
          <HiOutlineSquaresPlus className="m-auto text-[30px]" />
        </button>
      </div>
    </div>
  );
}
