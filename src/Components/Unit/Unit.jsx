/* eslint-disable react/prop-types */
// major components
import Content from "../Content/Content";
import Columns from "../Columns/Columns";
import Rows from "../Rows/Rows";
import WrapperForDropAreas from "../WrapperForDropAreas/WrapperForDropAreas";

export default function Unit({ map }) {
  return (
    <div className="w-full h-full overflow-hidden">
      {!map.a ? (
        <WrapperForDropAreas mapId={map.id}>
          <div className="h-full w-full bg-slate-800 bg-opacity-5 overflow-auto scrollbar-thin">
            <Content map={map} />
          </div>
        </WrapperForDropAreas>
      ) : map?.column ? (
        <WrapperForDropAreas mapId={map.id}>
          <Columns nodeA={map.a} nodeB={map.b} />
        </WrapperForDropAreas>
      ) : (
        <WrapperForDropAreas mapId={map.id}>
          <Rows nodeA={map.a} nodeB={map.b} />
        </WrapperForDropAreas>
      )}
    </div>
  );
}
