import "../App.css";
import "primereact/resources/primereact.css"; // core css
import TopOfForm from "./Form/TopOfForm.tsx";
import AddForm from "./Form/AddForm.tsx";
import Navbar from "./Navbar.tsx";

function App() {
  return (
    <>
      <div className="app-container justify-between">
        <Navbar isactive={false}></Navbar>
        <AddForm></AddForm>
      </div>

    </>
  );
}

export default App;
