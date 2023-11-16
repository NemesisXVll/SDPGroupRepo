import "../App.css";
import "primereact/resources/primereact.css"; // core css
import TopOfForm from "./Form/TopOfForm.tsx";
import Form from "./Form/Form.tsx";
import Navbar from "./Navbar.tsx";
import Stats from "./Stats.tsx";
import AddButton from "./Form/AddButton.tsx";
import Login from "./Login"
import Signup from "./Signup";
function App() {
  return (
    <>
      {/* <Login></Login> */}
      <Signup></Signup>
      <div className="app-container justify-between">
        {/* <Navbar isactive={false}></Navbar>
        <Stats></Stats>
        <Form></Form> */}

      </div>
      {/* <AddButton></AddButton> */}
    </>
  );
}

export default App;
