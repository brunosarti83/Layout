import Column from "./Components/Column/Column";
import Layout from "./Components/Layout/Layout";

function App() {
  return (
    <div className="w-full h-screen bg-red-500 flex justify-center items-center">
      <Layout>
        <Column />
      </Layout>
    </div>
  );
}

export default App;
