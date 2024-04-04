import Layout from "./Components/Layout/Layout";
import { useSelector } from "react-redux";
import {NextUIProvider} from "@nextui-org/react";

function App() {
  const map = useSelector((state) => state.map);

  return (
    <NextUIProvider>
      <div className="w-full h-screen bg-gray-50 flex px-4 justify-center items-center">
        <Layout map={map} />
      </div>
    </NextUIProvider>
  );
}

export default App;
