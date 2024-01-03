import MappingLayout from "./Components/MappingLayout/MappingLayout";
import { useSelector } from "react-redux";

function App() {
  const map = useSelector((state) => state.map);

  return (
    <div className="w-full h-screen bg-gray-50 flex px-4 justify-center items-center">
      <MappingLayout map={map} />
    </div>
  );
}

export default App;
