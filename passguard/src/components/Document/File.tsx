import { useState } from "react";
import Navbar from "../Navbar";
import { useLocation, useNavigate } from "react-router-dom";

function File() {
  const navigate = useNavigate();
  const location = useLocation();

  const [expanded, setExpanded] = useState(location.state?.expanded);

  function handleOnClick(): void {
    navigate("/document", { state: { expanded } });
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
        <a onClick={handleOnClick}>File</a>
      </div>
    </>
  );
}

export default File;
