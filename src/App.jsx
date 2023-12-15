import Layout from "./Components/Layout/Layout";
import Row from "./Components/Row/Row";
import Column from "./Components/Column/Column";
import MappingLayout from "./Components/MappingLayout/MappingLayout";

function App() {

  const layout = {
      content: [],
      next: {
        type: 'column',
        content: [],
        next: {
          type: 'row',
          content: [],
          next: {
            type: 'row',
            content: [],
            next: null
          }
        }
      }
  }

  return (
    <div className="w-full h-screen bg-red-500 flex justify-center items-center">
      <MappingLayout map={layout} />
      {/* <Layout>
        <Row>
          <Column>
            <Row />
          </Column>
        </Row>
      </Layout> */}
    </div>
  );
}

export default App;
