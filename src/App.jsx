import MappingLayout from "./Components/MappingLayout/MappingLayout";
import { useSelector } from "react-redux";

function App() {
  const map = useSelector((state) => state.map);

  return (
    <div className="w-full min-h-screen bg-red-500 flex pt-4 justify-center items-center">
      <MappingLayout map={map} />
    </div>
  );
}

export default App;
