import { useState } from "react";
import Navbar from "../Navbar";
import { useLocation, useNavigate } from "react-router-dom";

function Document() {
  const navigate = useNavigate();
  const location = useLocation();

  const [expanded, setExpanded] = useState(location.state?.expanded);

  function handleOnClick(): void {
    navigate("/file", { state: { expanded } });
  }

  return (
    <>
      <div className="app-container h-screen">
        <div className="navbar">
          <Navbar
            isExpanded={expanded}
            handleExpand={(expanded) => setExpanded(expanded)}
          />
        </div>
        <a onClick={handleOnClick}>Document</a>
      </div>
    </>
  );
}

export default Document;
