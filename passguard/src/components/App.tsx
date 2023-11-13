import "../App.css";
import "primereact/resources/primereact.css"; // core css
import TopOfForm from "./Form/TopOfForm.tsx";
import AddForm from "./Form/Form.tsx";
import Navbar from "./Navbar.tsx";
import Stats from "./Stats.tsx";

function App() {
  return (
    <>
      <div className="app-container">
        <Stats></Stats>
        
      </div>
    </>
  );
}

export default App;
