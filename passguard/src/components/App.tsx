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
  const [showForm, setShowForm] = useState(false);
  const [editInput, setEditInput] = useState(false);
  const [credential, setCredential] = useState<any>([]);

  const handleOnClickBTN = (e: any) => {
    e.preventDefault();
    setCredential({});
    setShowForm(true);
    setEditInput(true);
  };

  // Callback function to be passed to Grid
  const handleCardClickInApp = (
    credentialData: CredentialData,
    updateClicked: boolean
  ) => {
    setShowForm(false);
    setShowForm(false);

    // Introduce a delay before setting ShowForm to true
    setTimeout(() => {
      setCredential(credentialData);
      setShowForm(true);
      setEditInput(updateClicked);
    }, 0); // Adjust the delay time (in milliseconds) according to your needs
  };

  const handleFormBTN = (showForm: boolean) => {
    setShowForm(showForm);
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

        <div className="form">
          {showForm ? (
            <Form
              credentialObj={credential}
              editable={editInput}
              onBTNClick={handleFormBTN}
            ></Form>
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
