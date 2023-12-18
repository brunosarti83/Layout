import { useState } from "react";
import { createNewNode } from "./layout";
import MappingLayout from "./Components/MappingLayout/MappingLayout";
//import { widgets } from "./layout";

function App() {
  const layout = {
    outsideContent: [],
    next: null
  };

  const [map, setMap] = useState(layout);

  const addToLayout = (what) => {
    const newNode = createNewNode(what);
    const mapCopy = { ...map };
    let current = mapCopy;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
    setMap({ ...mapCopy });
  };

  const removeFromLayout = (id) => {
    const mapCopy = { ...map };
    let current = mapCopy;
    while (current) {
      if (current?.next?.id === id) {
        current.next = current.next.next;
      }
      current = current.next;
    }
    setMap({ ...mapCopy });
  };

  const addWidget = (id, widget) => {
    const mapCopy = { ...map };
    let current = mapCopy;
    while (current) {
      if (current.id === id) {
        current.insideContent.push(widget);
      }
      current = current.next;
    }
    setMap({ ...mapCopy });
  };

  return (
    <div className="w-full min-h-screen bg-red-500 flex pt-4 justify-center items-center">
      <MappingLayout
        map={map}
        addToLayout={addToLayout}
        removeFromLayout={removeFromLayout}
        addWidget={addWidget}
      />
    </div>
  );
}

export default App;
