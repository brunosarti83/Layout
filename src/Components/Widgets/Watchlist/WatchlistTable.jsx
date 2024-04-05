/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback, useRef } from "react";
import SingleTicker from "./SingleTicker";
import { BiSolidUpArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

export default function WatchlistTable({ symbols }) {
  const [columns, setColumns] = useState(["symbol", "price", "change"]);
  const [tableData, setTableData] = useState({});
  const ws = useRef(null);

  useEffect(() => {
    let url = "wss://fstream.binance.com/stream?streams=";
    symbols.forEach((symbol) => {
      const stream = symbol.toLowerCase() + "@ticker/";
      url += stream;
    });

    ws.current = new WebSocket(url.slice(0, -1));
    const wsCurrent = ws.current;

    ws.current.onmessage = (ev) => {
      const message = JSON.parse(ev.data);
      console.log(message);
      if (symbols.includes(message.data.s)) {
        setTableData((previous) => ({
          ...previous,
          [message.data.s]: {
            upTick: Number(message.data.c) > previous[message.data.s]?.price,
            price: Number(message.data.c),
            change: Number(message.data.P),
          },
        }));
        console.log(tableData);
      }
    };

    return () => {
      wsCurrent.close();
    };
  }, [symbols]);

  const renderCell = useCallback((tableData, symbol, columnKey) => {
    const cellValue = tableData[symbol]?.[columnKey];

    switch (columnKey) {
      case "symbol":
        return (
          <div className="flex items-center">
            <div className="mr-2">
              <SingleTicker symbol={symbol} />
            </div>
          </div>
        );
      case "price":
        return (
          <div
            className={`${
              cellValue > tableData[symbol]?.price
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {cellValue}
          </div>
        );
      case "change":
        return (
          <div
            className={`${cellValue > 0 ? "text-green-500" : "text-red-500"}`}
          >
            {cellValue}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <Table aria-label="Example table with dynamic content">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column}>{column}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {symbols.map((symbol) => (
            <TableRow key={symbol}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(tableData, symbol, columnKey)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
