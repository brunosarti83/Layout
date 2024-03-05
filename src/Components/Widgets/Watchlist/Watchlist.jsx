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
    height: "98%",
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
      <div className="px-1 h-full w-full">
        <WatchlistTable
          symbols={[
            {
              name: "ETHUSD",
              change: "4,15",
              price: "3.315,25",
            },
            {
              name: "BTCUSD",
              change: "6,74",
              price: "67.664,14",
            },
            {
              name: "SOLUSD",
              change: "3,10",
              price: "132,87",
            },
          ]}
        />
      </div>
      <div ref={preview}></div>
    </div>
  );
}

const WatchlistTable = ({ symbols }) => {
  return (
    <table className="w-full font-source text-sm">
      <tr className="bg-gray-600 text-gray-50">
        <th className="px-4 py-2 border-[1px] border-gray-300">Symbol</th>
        <th className="px-4 py-2 border-[1px] border-gray-300">Chg%</th>
        <th className="px-4 py-2 border-[1px] border-gray-300">LastPrice</th>
      </tr>
      {symbols.map((symbol) => (
        <tr key={symbol.name}>
          <td className="px-4 py-2 border-[1px] border-gray-300">
            {symbol.name}
          </td>
          <td className="px-4 py-2 border-[1px] border-gray-300 text-center">
            {symbol.change} %
          </td>
          <td className="px-4 py-2 border-[1px] border-gray-300 flex">
            $ <span className="ml-auto">{symbol.price}</span>
          </td>
        </tr>
      ))}
    </table>
  );
};
