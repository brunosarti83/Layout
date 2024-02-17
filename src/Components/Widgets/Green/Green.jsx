/* eslint-disable react/prop-types */

// minorComponents
import ThreeDotsMenu from "../../ThreeDotsMenu/ThreeDotsMenu";

export default function Green({ id, index, direction, onClose }) {
  const styles = {
    width:
      direction === "column" ? "100%" : direction === "row" ? "250px" : "100%",
    height:
      direction === "column" ? "250px" : direction === "row" ? "100%" : "",
  };
  return (
    <div
      style={{
        ...styles,
        viewTransitionName: "name-" + id,
      }}
      className="bg-green-200 rounded-[20px] flex flex-col flex-shrink-0"
    >
      <div className="w-full flex justify-start px-4 py-2">
        <ThreeDotsMenu onClose={onClose} />
      </div>
      {"<WidgetExample />"}
    </div>
  );
}
