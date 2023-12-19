/* eslint-disable react/prop-types */
import { addToLayout } from "../../redux/actions";
import { useDispatch } from "react-redux";

export default function AddButtons() {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-1">
      <button
        onClick={() => dispatch(addToLayout("column"))}
        className="bg-gray-300 h-6 px-2 text-center align-middle"
      >
        {"<"}
      </button>
      <button
        onClick={() => dispatch(addToLayout("row"))}
        className="bg-gray-300 h-6 px-2 text-center align-middle"
      >
        {"v"}
      </button>
    </div>
  );
}
