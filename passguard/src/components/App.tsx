import "../App.css";
import "primereact/resources/primereact.css"; // core css
import TopOfForm from "./Form/TopOfForm.tsx";
import Form from "./Form/Form.tsx";
import Navbar from "./Navbar.tsx";
import Stats from "./Stats.tsx";
import AddButton from "./Form/AddButton.tsx";
import Login from "./Login"
import Signup from "./Signup";
import Grid from "./Grid";
function App() {
  return (
    <>
     
      <div className="app-container justify-between">
        <Navbar isactive={false}></Navbar>
        <Stats></Stats>
        <Form></Form>
        {/* <Grid></Grid> */}
      </div>
      {/* <AddButton></AddButton> */}
    </>
  );
}

export default App;
