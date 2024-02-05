/* eslint-disable react/prop-types */
import { addToLayout } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { VscSplitHorizontal } from "react-icons/vsc";
import { VscSplitVertical } from "react-icons/vsc";


export default function AddButtons() {
  const dispatch = useDispatch();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div
      className="w-[80px] h-[50px] flex bg-gradient-to-tr from-gray-100/10 to-gray-150/15 drop-shadow-md overflow-hidden relative rounded-[10px]"
      onMouseEnter={() => setShowAdd(true)}
      onMouseLeave={() => setShowAdd(false)}
    >
      <div
        className={`flex gap-[2px] h-[30px] text-white m-auto relative -top-[60px] transition-all duration-150 ${
          showAdd ? "translate-y-[60px]" : ""
        }`}
      >
        <button
          onClick={() => dispatch(addToLayout("column"))}
          className="bg-sky-500/5 h-full w-[25px] rounded-[5px] text-center align-middle"
        >
          <VscSplitVertical className="mx-auto text-lg text-gray-500" />
        </button>
        <button
          onClick={() => dispatch(addToLayout("row"))}
          className="bg-sky-500/5 h-full w-[25px] rounded-[5px] text-center align-middle"
        >
          <VscSplitHorizontal className="mx-auto text-lg text-gray-500" />
        </button>
      </div>
    </div>
  );
}
