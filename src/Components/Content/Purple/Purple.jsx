/* eslint-disable react/prop-types */
export default function Purple({ direction }) {
  const styles = {
    width: direction === "column" ? "100%" : "250px",
    height: direction === "column" ? "250px" : "100%",
  };
  return (
    <div
      style={styles}
      className="bg-purple-500 rounded-[20px] flex-shrink-0 flex"
    >
      <p className="m-auto">Purple Content</p>
    </div>
  );
}
