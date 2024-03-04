import "../App.css";
import "primereact/resources/primereact.css"; // core css
import Form from "./Form/Form.tsx";
import Navbar from "./Navbar.tsx";
import Stats from "./Stats.tsx";
import Grid from "./CredentialSection/Grid.tsx";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CredentialData } from "./CredentialSection/Grid.tsx";
import AutoRedirectHook from "./Inactivity/AutoRedirectHook.tsx";

function Home() {
  const location = useLocation();

  useEffect(() => {
    window.history.pushState(null, "", "/login");
    window.onpopstate = function () {
      window.history.pushState(null, "", "/login");
    };
  }, []);

  const user = location.state.user;
  const navigate = useNavigate();

  //   useEffect(() => {
  //   	window.addEventListener("popstate", (e) => {
  //   		window.history.go(1);
  //   	});
  //   }, []);

  const [showForm, setShowForm] = useState(false);
  const [editInput, setEditInput] = useState(false);
  const [credential, setCredential] = useState<any>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [forceGridRender, setForceGridRender] = useState(false);
  const [syncStats, setSyncStats] = useState(false);
  const [expanded, setExpanded] = useState(location.state?.expanded);
  const { redirect, setRedirect } = AutoRedirectHook(
    undefined,
    undefined,
    expanded
  );

  const handleNotifyStats = (): void => {
    console.log("Notifying Stats");
    setSyncStats((syncStats) => !syncStats);
    setForceGridRender((forceGridRender) => !forceGridRender);
  };

  const handleAddClick = () => {
    setCredential({});
    setShowForm(false);
    setEditInput(true);
    // Introduce a delay before setting ShowForm to true
    setTimeout(() => {
      setShowForm(true);
    }, 0); // Adjust the delay time (in milliseconds) according to your needs
  };

  // Callback function to be passed to Grid
  const handleCardClickInApp = (
    credentialData: CredentialData,
    updateClicked: boolean
  ) => {
    setShowForm(false);

    // Introduce a delay before setting ShowForm to true
    setTimeout(() => {
      setShowForm(true);
    }, 0); // Adjust the delay time (in milliseconds) according to your needs
    setCredential(credentialData);
    setEditInput(updateClicked);
  };

  const handleFormBTN = (showForm: boolean) => {
    setShowForm(showForm);
  };

  function handleFormSubmitted(): void {
    setFormSubmitted((formSubmitted) => !formSubmitted);
    setSyncStats((syncStats) => !syncStats);
  }

  function handleForceRender(): void {
    setForceGridRender((forceGridRender) => !forceGridRender);
    setSyncStats((syncStats) => !syncStats);
    setShowForm(false);
  }

  return (
    <>
      {redirect}
      <div className="app-container h-screen">
        <div className="navbar">
          <Navbar
            isExpanded={location.state.expanded}
            handleExpand={(expanded) => setExpanded(expanded)}
          ></Navbar>
        </div>

        <div className="stats mb-5">
          <Stats sync={syncStats}></Stats>
        </div>

        <div className="form">
          {showForm ? (
            <Form
              onCardClick={handleCardClickInApp}
              userId={user.userId}
              formSubmitted={handleFormSubmitted}
              credentialObj={credential}
              editable={editInput}
              onBTNClick={handleFormBTN}
              forceRender={handleForceRender}
            ></Form>
          ) : (
            ""
          )}
        </div>

        <div className="credentials overflow-auto ml-4 mt-3">
          <Grid
            forceRender={forceGridRender}
            userId={user.userId}
            onCardClick={handleCardClickInApp}
            onAddClick={handleAddClick}
            onFormSubmit={formSubmitted}
            notifyStats={handleNotifyStats}
          ></Grid>
        </div>
      </div>
    </>
  );
}

export default Home;
