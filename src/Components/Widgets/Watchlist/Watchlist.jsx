/* eslint-disable react/prop-types */

// components
import WatchlistTable from "./WatchlistTable";
// hooks & tools
import { useDispatch } from "react-redux";
import { dndTypes } from "../../../layout";
// react-dnd
import { useDrag } from "react-dnd";
// actions
import { changeWidgets } from "../../../redux/actions";
// minorComponents
import ThreeDotsMenu from "../../ThreeDotsMenu/ThreeDotsMenu";

export default function Watchlist({ id, parentId, direction, onClose }) {
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
    width: "98%",
    maxWidth: direction === "row" ? "400px" : "",
    maxHeight: direction === "column" ? "90dvh" : "",
  };

  return (
    <div
      style={{
        ...styles,
        viewTransitionName: "name-" + id,
      }}
      className="bg-gray-50 rounded-[20px] flex flex-col flex-shrink-0"
    >
      <div
        ref={drag}
        className="w-full flex justify-start px-4 py-2 cursor-grab active:cursor-grabbing"
      >
        <ThreeDotsMenu onClose={onClose} />
      </div>
      <div className="flex flex-col px-8">
        <h3 className="text-3xl text-gray-800 font-bold px-1">Watchlist</h3>
        <h6 className="text-gray-500 px-1">
          Small watchlist description in order to recognize it.
        </h6>
      </div>
      <div className="p-2 h-full w-full mt-4">
        <WatchlistTable symbols={["ETHUSDT", "BTCUSDT", "SOLUSDT"]} />
      </div>
      <div ref={preview}></div>
    </div>
  );
}
