import Layout from "./Components/Layout/Layout";
import Row from "./Components/Row/Row";
import Column from "./Components/Column/Column";

function App() {
  return (
    <div className="w-full h-screen bg-red-500 flex justify-center items-center">
      <Layout>
        <Row>
          <Column>
            <Row />
          </Column>
        </Row>
      </Layout>
    </div>
  );
}

export default App;
