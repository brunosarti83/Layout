/* eslint-disable react/prop-types */

// major components
import Unit from "../Unit/Unit";
import AddWidget from "../AddWidget/AddWidget";
// react-dnd Multi
import { DndProvider, MultiBackend } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch"; // or any other pipeline


export default function Layout({ map }) {
  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <div className="bg-gray-50 h-[100dvh] w-full flex relative py-4 overflow-hidden">
        <Unit map={map} />
        <div className="absolute bottom-10 left-10">
          <AddWidget />
        </div>
      </div>
    </DndProvider>
  );
}
