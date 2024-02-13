/* eslint-disable react/prop-types */
import DropAreaRow from "../DropAreaRow/DropAreaRow";
import DropAreaColumn from "../DropAreaColumn/DropAreaColumn";

export default function WrapperForDropAreas({ mapId, children }) {
  return (
    <div id="wrapperForDropAreas" className="w-full h-full flex flex-col gap-0">
      <DropAreaRow mapId={mapId} position={"top"} />
      <div className="w-full h-full flex gap-0">
        <DropAreaColumn mapId={mapId} position={"left"} />
        {children}
        <DropAreaColumn mapId={mapId} position={"right"} />
      </div>
      <DropAreaRow mapId={mapId} position={"bottom"} />
    </div>
  );
}
