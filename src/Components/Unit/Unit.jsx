/* eslint-disable react/prop-types */
// major components
import Content from "../Content/Content";
import Columns from "../Columns/Columns";
import Rows from "../Rows/Rows";

export default function Unit({ map }) {
  return (
    <div className="w-full h-full">
      {!map.a ? (
        <Content map={map} />
      ) : map?.column ? (
        <Columns nodeA={map.a} nodeB={map.b} />
      ) : (
        <Rows nodeA={map.a} nodeB={map.b} />
      )}
    </div>
  );
}
