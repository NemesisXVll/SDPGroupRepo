import "../App.css";
import "primereact/resources/primereact.css"; // core css
import TopOfForm from "./Form/TopOfForm.tsx";
import Form from "./Form/Form.tsx";
import Navbar from "./Navbar.tsx";
import Stats from "./Stats.tsx";
import AddButton from "./Form/AddButton.tsx";
import Login from "./Login";
import Signup from "./Signup";
import Grid from "./Grid";
import { useState } from "react";

function App() {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleOnClickBTN = (e: any) => {
    e.preventDefault();
    setShowAddForm(!showAddForm);
  };

  return (
    <>
      <div className="app-container h-screen">
        <div className="navbar">
          <Navbar isactive={false}></Navbar>
        </div>

        <div className="stats">
          <Stats></Stats>
        </div>

        <div className="form">
          <AddButton onClick={handleOnClickBTN}></AddButton>
          {showAddForm ? <Form></Form> : ""}
        </div>

        <div className="credentials overflow-auto">
          <Grid></Grid>
        </div>
      </div>
    </>
  );
}

export default App;
