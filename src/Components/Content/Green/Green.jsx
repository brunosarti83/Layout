/* eslint-disable react/prop-types */
export default function Green({ direction }) {
  const styles = {
    width: direction === "column" ? "100%" : "250px",
    height: direction === "column" ? "250px" : "100%",
  };
  return (
    <div
      style={styles}
      className="bg-emerald-500 rounded-[20px] flex flex-shrink-0"
    >
      <p className="m-auto">Green Content</p>
    </div>
  );
}
