/* eslint-disable react/prop-types */

// major components
import MainContent from "../MainContent/MainContent";
import MappingColumn from "../MappingColumn/MappingColumn";
import MappingRow from "../MappingRow/MappingRow";
// react-beatiful-dnd
import { DragDropContext } from "react-beautiful-dnd";

export default function MappingLayout({ map }) {
  return (
    <div className="bg-yellow-200 h-[90dvh] w-[90%] flex relative">
      <DragDropContext>
        {!map.next && <MainContent />}
        {map?.next?.type === "row" ? (
          <MappingRow map={map.next} />
        ) : (
          map?.next?.type === "column" && <MappingColumn map={map.next} />
        )}
      </DragDropContext>
    </div>
  );
}
