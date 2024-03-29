/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import { motion } from "framer-motion";
import { widgets, dndTypes } from "../../layout";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { addWidget } from "../../redux/actions";

const menu = {
  open: {
    width: "280px",
    height: "500px",
    bottom: "-10px",
    left: "-10px",
    opacity: 1,
    transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    width: "0px",
    height: "0px",
    bottom: "20px",
    left: "20px",
    opacity: 0,
    transition: {
      duration: 0.75,
      delay: 0.35,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export default function AddWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50">
      <OpenList setIsOpen={setIsOpen} />
      <motion.div
        onMouseLeave={() => setIsOpen(false)}
        className="absolute bg-slate-900/30 rounded-[50px] flex justify-center items-center px-2 pb-20 pt-6 backdrop-filter backdrop-blur-[50px]"
        variants={menu}
        animate={isOpen ? "open" : "closed"}
        initial="closed"
      >
        <WidgetsNav isOpen={isOpen} />
      </motion.div>
    </div>
  );
}

function OpenList({ setIsOpen }) {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div
      className="w-[80px] h-[80px] flex bg-gradient-to-tr from-gray-100/20 to-gray-150/25 drop-shadow-md overflow-hidden relative rounded-full z-10"
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
          className="bg-sky-500 h-full w-full rounded-full flex"
        >
          <HiOutlineSquaresPlus className="m-auto text-[30px]" />
        </button>
      </div>
    </div>
  );
}

function WidgetsNav({ isOpen }) {
  const scrollable = useRef(null);

  return (
    <div className="w-full h-full text-white font-source">
      <div className="font-bold border-b-[1px] border-b-white shadow-sm text-center pb-2 mb-2">
        drag and drop...
      </div>
      <div
        id="scrollable"
        ref={scrollable}
        className={`flex w-full max-h-[70%] mt-10 overflow-auto scrollbar-none relative ${
          !isOpen ? "hidden" : ""
        }`}
      >
        <ul className="flex flex-col w-full">
          {Object.keys(widgets).map((widget, index) => (
            <li key={index}>
              <WidgetItem widget={widget} scrollable={scrollable} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function WidgetItem({ widget, scrollable }) {
  const dispatch = useDispatch();

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    // drag & dragPreview are Refs: [ ..., drag, dragPreview] = useDrag()
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: dndTypes.WIDGET_BOX,
    item: { widget },
    end(item, monitor) {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        dispatch(
          addWidget(dropResult.dropId, item.widget, dropResult.position)
        );
      } else {
        return null;
      }
    },
    // The collect function utilizes a "monitor" instance
    // to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0.5 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ root: scrollable }}
      whileHover={{
        scale: 1.1,
      }}
      className="w-full h-[60px] hover:bg-gray-300/50 pl-[30px]"
    >
      <div className="w-full h-full flex gap-2 items-center">
        <div
          ref={drag}
          className="h-[80%] my-auto w-[25px] bg-dot-small-white cursor-grab"
        />
        <div className="w-10 h-10 rounded-[25%] flex justify-center items-center border-[2px] border-white">
          {widget[0].toUpperCase()}
          {widget[1]}
        </div>
        <div className="text-lg">
          {widget[0].toUpperCase() + widget.slice(1)}
        </div>
      </div>
      <div ref={preview}></div>
    </motion.div>
  );
}
