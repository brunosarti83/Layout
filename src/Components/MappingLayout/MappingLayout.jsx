/* eslint-disable react/prop-types */
import AddButtons from "../AddButtons/AddButtons";
import MappingColumn from "../MappingColumn/MappingColumn";
import MappingRow from "../MappingRow/MappingRow";

export default function MappingLayout({ map }) {
  return (
    <div className="bg-yellow-200 h-[90dvh] w-[90%] flex relative">
      {!map.next && (
        <div className="absolute top-0 right-0 m-[2px]">
          <AddButtons />
        </div>
      )}
      {map?.next?.type === "row" ? (
        <MappingRow map={map.next} />
      ) : (
        map?.next?.type === "column" && <MappingColumn map={map.next} />
      )}
    </div>
  );
}
