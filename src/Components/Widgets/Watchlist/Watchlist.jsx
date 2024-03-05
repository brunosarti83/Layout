/* eslint-disable react/prop-types */

// hooks & tools
import { useDispatch } from "react-redux";
import { dndTypes } from "../../../layout";
import { useEffect, useRef, useState } from "react";
// react-dnd
import { useDrag } from "react-dnd";
// actions
import { changeWidgets } from "../../../redux/actions";
// minorComponents
import ThreeDotsMenu from "../../ThreeDotsMenu/ThreeDotsMenu";
import { BiSolidUpArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";

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
      <div className="px-1 h-full w-full">
        <WatchlistTable
          symbols={["ETHUSDT", "BTCUSDT", "SOLUSDT"]}
        />
      </div>
      <div ref={preview}></div>
    </div>
  );
}

const WatchlistTable = ({ symbols }) => {

  const [tableData, setTableData] = useState({})
  const ws = useRef(null);

  useEffect(() => {
    let url = "wss://fstream.binance.com/stream?streams="
    symbols.forEach((symbol) => {
      const stream = symbol.toLowerCase() + '@ticker/'
      url += stream
    })
    
    ws.current = new WebSocket(url.slice(0, -1));
    const wsCurrent = ws.current;

    ws.current.onmessage = (ev) => {
      const message = JSON.parse(ev.data)
      console.log(message)
      if (symbols.includes(message.data.s)) {
        setTableData((previous) => ({ ...previous, [message.data.s] : { upTick: Number(message.data.c) > previous[message.data.s]?.price, price: Number(message.data.c), change: Number(message.data.P) }}))
        console.log(tableData)
      }
    }

    return () => {
        wsCurrent.close();
    };
  }, [symbols])

  return (
    <table className="w-full font-source text-sm mb-8">
      <thead>
        <tr className="bg-gray-600 text-gray-50">
          <th className="px-4 py-2 border-[1px] border-gray-300">Symbol</th>
          <th className="px-4 py-2 border-[1px] border-gray-300">Chg%</th>
          <th className="px-4 py-2 border-[1px] border-gray-300">LastPrice</th>
        </tr>
      </thead>
      <tbody>
        {symbols.map((symbol, index) => (
          <tr key={index}>
            <td className="px-4 py-2 border-[1px] border-gray-300">
              {symbol}
            </td>
            <td className={`px-4 py-2 border-[1px] border-gray-300 text-center ${tableData[symbol]?.change > 0 ? "text-green-600" : tableData[symbol]?.change < 0 && "text-red-500"}`}>
               {tableData[symbol]?.change || 0.00}%
            </td>
            <td className={`px-4 py-2 border-[1px] border-gray-300 flex ${tableData[symbol]?.upTick ? "text-green-600" : "text-red-500"}`}>
              $ <span className="ml-auto">{tableData[symbol]?.price || 0.00}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
