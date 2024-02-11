/* eslint-disable react/prop-types */
// major components
import Content from "../Content/Content";
import Columns from "../Columns/Columns";
import Rows from "../Rows/Rows";
import DropAreaRow from "../DropAreaRow/DropAreaRow";

export default function Unit({ map }) {
  return (
    <div className="w-full h-full overflow-auto flex flex-col gap-0">
      <DropAreaRow />
      {!map.a ? (
        <Content map={map} />
      ) : map?.column ? (
        <Columns nodeA={map.a} nodeB={map.b} />
      ) : (
        <Rows nodeA={map.a} nodeB={map.b} />
      )}
      <DropAreaRow />
    </div>
  );
}
