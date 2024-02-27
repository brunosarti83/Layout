/* eslint-disable react/prop-types */

// hooks & tools
import { useDispatch } from "react-redux";
import { dndTypes } from "../../../layout";
// react-dnd
import { useDrag } from "react-dnd";
// actions
import { changeWidgets } from "../../../redux/actions";
// minorComponents
import ThreeDotsMenu from "../../ThreeDotsMenu/ThreeDotsMenu";
import AdvancedChart from "../../TradingViewComponents/AdvChart/AdvChart";

export default function Chart({ id, parentId, direction, onClose }) {
  const dispatch = useDispatch();

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: dndTypes.WIDGET,
      item: { widId: id, parentId },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          dispatch(
            changeWidgets(
              item.widId,
              item.parentId,
              dropResult.dropId,
              dropResult.position
            )
          );
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id]
  );

  const styles = {
    width: "100%",
    height: "100%",
    maxWidth: direction === "row" ? "400px" : "",
    maxHeight: direction === "column" ? "90dvh" : "",
  };

  return (
    <div
      ref={drag}
      style={{
        ...styles,
        viewTransitionName: "name-" + id,
      }}
      className="bg-gray-50 rounded-[20px] flex flex-col flex-shrink-0"
    >
      <div className="w-full flex justify-start px-4 py-2 cursor-grab active:cursor-grabbing">
        <ThreeDotsMenu onClose={onClose} />
      </div>
      <AdvancedChart />
      <div ref={preview}></div>
    </div>
  );
}
