/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
// actions
import { removeFromLayout } from "../../redux/actions";

export default function RemoveBtn({ targetId, column }) {
  const dispatch = useDispatch();
  const [showRemove, setShowRemove] = useState(false);
  return (
    <>
      {column ? (
        <div
          className="w-full mt-auto h-[25px] overflow-hidden relative flex-shrink-0"
          onMouseEnter={() => setShowRemove(true)}
          onMouseLeave={() => setShowRemove(false)}
        >
          <button
            onClick={() => dispatch(removeFromLayout(targetId))}
            className={
              "text-gray-100 w-full h-[25px] mt-auto bg-red-400 ml-auto " +
              `relative bottom-[-25px] transition-all duration-150 ${
                showRemove ? "translate-y-[-25px]" : null
              }`
            }
          >
            remove
          </button>
        </div>
      ) : (
        <div
          className="ml-auto h-full w-[25px] overflow-hidden relative flex-shrink-0"
          onMouseEnter={() => setShowRemove(true)}
          onMouseLeave={() => setShowRemove(false)}
        >
          <button
            onClick={() => dispatch(removeFromLayout(targetId))}
            className={
              "text-gray-100 h-full ml-auto bg-red-400 " +
              `relative right-[-25px] transition-all duration-150 ${
                showRemove ? "translate-x-[-25px]" : null
              }`
            }
          >
            <p className="-rotate-90 relative right-[15px]">remove</p>
          </button>
        </div>
      )}
    </>
  );
}
