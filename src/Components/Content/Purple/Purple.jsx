/* eslint-disable react/prop-types */
export default function Purple({ direction, onClose }) {
  const styles = {
    width: direction === "column" ? "100%" : "250px",
    height: direction === "column" ? "250px" : "100%",
  };
  return (
    <div
      style={styles}
      className="bg-purple-500 rounded-[20px] flex-shrink-0 flex flex-col"
    >
      <p className="m-auto">Purple Content</p>
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
