/* eslint-disable react/prop-types */

// major components
import MainContent from "../MainContent/MainContent";
import MappingColumn from "../MappingColumn/MappingColumn";
import MappingRow from "../MappingRow/MappingRow";
// hoooks and tools
import { useDispatch } from "react-redux";
// actions
import { reorder } from "../../redux/actions";
// react-beatiful-dnd
import { DragDropContext } from "react-beautiful-dnd";
// viewTransition
import { viewTransitionWrapper } from "../../helpers/viewTransitionWrapper";

export default function MappingLayout({ map }) {
  const dispatch = useDispatch();

  const handleDragEnd = (result) => {
    viewTransitionWrapper(() => {
      dispatch(reorder(result));
    })
  };

  return (
    <div className="bg-yellow-200 h-[90dvh] w-[90%] flex relative overflow-auto">
      <DragDropContext onDragEnd={handleDragEnd}>
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
