/* eslint-disable react/prop-types */
// major components
import Content from "../Content/Content";
import Columns from "../Columns/Columns";
import Rows from "../Rows/Rows";
import WrapperForDropAreas from "../WrapperForDropAreas/WrapperForDropAreas";

export default function Unit({ map }) {
  return (
    <div className="w-full h-full overflow-auto">
      {!map.a ? (
        <WrapperForDropAreas>
          <div className="h-full w-full bg-slate-800 bg-opacity-5">
            <Content map={map} />
          </div>
        </WrapperForDropAreas>
      ) : map?.column ? (
        <WrapperForDropAreas>
          <Columns nodeA={map.a} nodeB={map.b} />
        </WrapperForDropAreas>
      ) : (
        <WrapperForDropAreas>
          <Rows nodeA={map.a} nodeB={map.b} />
        </WrapperForDropAreas>
      )}
    </div>
  );
}
