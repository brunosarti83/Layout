import Layout from "./Components/Layout/Layout";
import { useSelector } from "react-redux";

function App() {
  const map = useSelector((state) => state.map);

  return (
    <div className="w-full h-screen bg-gray-50 flex px-4 justify-center items-center">
      <Layout map={map} />
    </div>
  );
}

export default App;
