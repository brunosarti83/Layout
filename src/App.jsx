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
        break
      }
      current = current.next;
    }
    setMap({ ...mapCopy });
  };

  const addWidget = (id, widgetType) => {
    const newWidget = {
      id: String(Math.floor(Math.random()*10000)),
      type: widgetType
    }
    const mapCopy = { ...map };
    let current = mapCopy;
    // ojo cuando quiera operar widgets en el layout current.id podría no existir
    while (current) {
      if (current.id === id) {
        current.insideContent.push(newWidget);
        break
      }
      current = current.next;
    }
    setMap({ ...mapCopy });
  };

  const removeWidget = (layoutId, widgetId) => {
    const mapCopy = { ...map };
    let current = mapCopy;
    // ojo cuando quiera operar widgets en el layout current.id podría no existir
    while (current) {
      if (current.id === layoutId) {
        current.insideContent = current.insideContent.filter(widget => widget.id !== widgetId);
        break
      }
      current = current.next;
    }
    setMap({ ...mapCopy });
  }

  return (
    <div className="w-full min-h-screen bg-red-500 flex pt-4 justify-center items-center">
      <MappingLayout
        map={map}
        addToLayout={addToLayout}
        removeFromLayout={removeFromLayout}
        addWidget={addWidget}
        removeWidget={removeWidget}
      />
    </div>
  );
}

export default App;
