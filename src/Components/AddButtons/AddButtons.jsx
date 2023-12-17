/* eslint-disable react/prop-types */
export default function AddButtons({ addToLayout }) {
  return (
    <div className="flex gap-1">
      <button
        onClick={() => addToLayout("column")}
        className="bg-gray-300 h-6 px-2 text-center align-middle"
      >
        {"<"}
      </button>
      <button
        onClick={() => addToLayout("row")}
        className="bg-gray-300 h-6 px-2 text-center align-middle"
      >
        {"v"}
      </button>
    </div>
  );
}
