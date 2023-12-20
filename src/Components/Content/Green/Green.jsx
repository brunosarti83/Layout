/* eslint-disable react/prop-types */
export default function Green({ direction, onClose }) {
  const styles = {
    width:
      direction === "column" ? "100%" : direction === "row" ? "250px" : "300px",
    height:
      direction === "column" ? "250px" : direction === "row" ? "100%" : "300px",
  };
  return (
    <div
      style={styles}
      className="bg-emerald-500 rounded-[20px] flex flex-col flex-shrink-0"
    >
      <p className="m-auto">Green Content</p>
      <button
        type="button"
        onClick={onClose}
        className="m-auto p-2 bg-gray-400 border-[1px] border-solid border-gray-700"
      >
        Close
      </button>
    </div>
  );
}