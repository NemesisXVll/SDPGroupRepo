import "../App.css";
import "primereact/resources/primereact.css"; // core css
import TopOfForm from "./Form/TopOfForm.tsx";
import AddForm from "./Form/AddForm.tsx";
import Navbar from "./Navbar.tsx";
import GridCard from "./GridCard.tsx";
import PasswordGenerator from "./Form/Password.tsx";

function App() {
  return (
    <>
      <div className="app-container">
        <Navbar isactive={false}></Navbar>
      </div>
    </>
  );
}

export default App;
