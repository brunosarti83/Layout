/* eslint-disable react/prop-types */
import { addToLayout } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

export default function AddButtons() {
  const dispatch = useDispatch();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div
      className="w-[100px] h-[55px] flex bg-gradient-to-tr from-gray-100/10 to-gray-150/15 drop-shadow-md overflow-hidden relative rounded-[15px]"
      onMouseEnter={() => setShowAdd(true)}
      onMouseLeave={() => setShowAdd(false)}
    >
      <div
        className={`flex gap-[2px] h-[45px] text-white m-auto relative -top-[60px] transition-all duration-150 ${
          showAdd ? "translate-y-[60px]" : ""
        }`}
      >
        <button
          onClick={() => dispatch(addToLayout("column", "right"))}
          className="bg-sky-500 h-full w-[20px] rounded-l-[10px] text-center align-middle"
        >
          <IoIosArrowBack className="mx-auto text-lg" />
        </button>
        <div className="flex flex-col gap-[2px]">
          <div className="bg-sky-500 h-1/2"></div>
          <button
            onClick={() => dispatch(addToLayout("row"))}
            className="bg-sky-500 h-1/2 w-[50px] text-center align-middle"
          >
            <IoIosArrowDown className="mx-auto text-lg" />
          </button>
        </div>
        <button
          onClick={() => dispatch(addToLayout("column", "left"))}
          className="bg-sky-500 h-full w-[20px] rounded-r-[10px] text-center align-middle"
        >
          <IoIosArrowForward className="mx-auto text-lg" />
        </button>
      </div>
    </div>
  );
}
