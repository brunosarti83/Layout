/* eslint-disable react/prop-types */
import DropAreaRow from "../DropAreaRow/DropAreaRow";
import DropAreaColumn from "../DropAreaColumn/DropAreaColumn";

export default function WrapperForDropAreas({ children }) {
  return (
    <div id="wrapperForDropAreas" className="w-full h-full flex flex-col gap-0">
      <DropAreaRow />
      <div className="w-full h-full flex gap-0">
        <DropAreaColumn />
        {children}
        <DropAreaColumn />
      </div>
      <DropAreaRow />
    </div>
  );
}
