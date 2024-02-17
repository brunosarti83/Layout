/* eslint-disable react/prop-types */

// major components
import Unit from "../Unit/Unit";
import AddWidget from "../AddWidget/AddWidget";
// hoooks and tools
import { useDispatch } from "react-redux";
// actions
import { reorder } from "../../redux/actions";
// react-dnd
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
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
    <DndProvider backend={HTML5Backend}>
      <div className="bg-gray-50 h-[100dvh] w-full flex relative py-4 overflow-hidden">
        <Unit map={map} />
        <div className="absolute bottom-10 left-10">
          <AddWidget />
        </div>
      </div>
    </DndProvider>
  );
}
