import "../App.css";
import "primereact/resources/primereact.css"; // core css
import Form from "./Form/Form.tsx";
import Navbar from "./Navbar.tsx";
import Stats from "./Stats.tsx";
import AddButton from "./Form/AddButton.tsx";
import Login from "./Login";
import Signup from "./Signup";
import Grid from "./CredentialSection/Grid.tsx";
import { useState } from "react";
import { CredentialData } from "./CredentialSection/Grid.tsx";

function App() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editInput, setEditInput] = useState(false);
  const [credential, setCredential] = useState<any>([]);

  const handleOnClickBTN = (e: any) => {
    e.preventDefault();
    setShowAddForm(!showAddForm);
    setEditInput(true);
  };

  // Callback function to be passed to Grid
  const handleCardClickInApp = (credentialData: CredentialData) => {
    setCredential(credentialData);
    setShowAddForm(true);
    setEditInput(false);
  };

  return (
    <>
      <div className="app-container h-screen">
        <div className="navbar">
          <Navbar isactive={false}></Navbar>
        </div>

        <div className="stats mb-5">
          <Stats></Stats>
        </div>

        <AddButton onClick={handleOnClickBTN}></AddButton>
        <div className="form">
          {showAddForm ? (
            <Form credentialObj={credential} editable={editInput}></Form>
          ) : (
            ""
          )}
        </div>

        <div className="credentials overflow-auto ml-4 mt-3">
          <Grid onCardClick={handleCardClickInApp}></Grid>
        </div>
      </div>
    </>
  );
}

export default App;
