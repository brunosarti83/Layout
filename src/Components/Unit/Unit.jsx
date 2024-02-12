/* eslint-disable react/prop-types */
// major components
import Content from "../Content/Content";
import Columns from "../Columns/Columns";
import Rows from "../Rows/Rows";
import WrapperForDropAreas from "../WrapperForDropAreas/WrapperForDropAreas";
import RemoveBtn from "../RemoveBtn/RemoveBtn";

export default function Unit({ map }) {
  return (
    <div className="w-full h-full overflow-auto">
      {!map.a ? (
        <WrapperForDropAreas>
          <div
            className={`w-full h-full flex ${map.column && "flex-col"} gap-0`}
          >
            <Content map={map} />
            <RemoveBtn targetId={map.id} column={map.column} />
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
