/* eslint-disable react/prop-types */

// major components
import Unit from "../Unit/Unit";
import AddWidget from "../AddWidget/AddWidget";
// hoooks and tools
import { useDispatch } from "react-redux";
// actions
import { reorder } from "../../redux/actions";
// react-beatiful-dnd
import { DragDropContext } from "react-beautiful-dnd";
// viewTransition
import { viewTransitionWrapper } from "../../helpers/viewTransitionWrapper";

export default function Layout({ map }) {
  const dispatch = useDispatch();

  const handleDragEnd = (result) => {
    viewTransitionWrapper(() => {
      dispatch(reorder(result));
    });
  };

  return (
    <div className="bg-gray-50 h-[100dvh] w-full flex relative py-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Unit map={map} />
      </DragDropContext>
      <div className="absolute bottom-10 left-10">
        <AddWidget />
      </div>
    </div>
  );
}
