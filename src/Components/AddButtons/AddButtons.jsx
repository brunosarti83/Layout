/* eslint-disable react/prop-types */
import { addToLayout, removeFromLayout, changeDirection } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { VscSplitHorizontal } from "react-icons/vsc";
import { VscSplitVertical } from "react-icons/vsc";
import { VscChromeClose } from "react-icons/vsc";
import { VscArrowRight } from "react-icons/vsc";
import { VscArrowDown } from "react-icons/vsc";

export default function AddButtons({ id, column }) {
  const dispatch = useDispatch();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div
      className="w-[115px] h-[40px] flex bg-gradient-to-tr from-gray-100/10 to-gray-150/15 drop-shadow-md overflow-hidden relative rounded-[10px]"
      onMouseEnter={() => setShowAdd(true)}
      onMouseLeave={() => setShowAdd(false)}
    >
      <div
        className={`flex gap-[2px] h-[30px] text-white m-auto relative -top-[60px] transition-all duration-150 ${
          showAdd ? "translate-y-[60px]" : ""
        }`}
      >
        <button
          onClick={() => dispatch(changeDirection(id))}
          className="bg-sky-500/5 h-full w-[25px] rounded-[5px] text-center align-middle"
        >
          { column
            ? <VscArrowRight className="mx-auto text-lg text-gray-500" />
            : <VscArrowDown className="mx-auto text-lg text-gray-500" />
          }
        </button>
        <button
          onClick={() => dispatch(addToLayout(id, "row"))}
          className="bg-sky-500/5 h-full w-[25px] rounded-[5px] text-center align-middle"
        >
          <VscSplitVertical className="mx-auto text-lg text-gray-500" />
        </button>
        <button
          onClick={() => dispatch(addToLayout(id, "column"))}
          className="bg-sky-500/5 h-full w-[25px] rounded-[5px] text-center align-middle"
        >
          <VscSplitHorizontal className="mx-auto text-lg text-gray-500" />
        </button>
        <button
          onClick={() => dispatch(removeFromLayout(id))}
          className="bg-sky-500/5 h-full w-[25px] rounded-[5px] text-center align-middle"
        >
          <VscChromeClose className="mx-auto text-lg text-gray-500" />
        </button>
      </div>
    </div>
  );
}
