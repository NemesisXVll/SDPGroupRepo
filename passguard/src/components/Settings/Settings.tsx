import { useState } from "react";
import Navbar from "../Navbar";
import { Label } from "flowbite-react";
import { CiSettings } from "react-icons/ci";
import { useLocation } from "react-router-dom";

type SettingsProps = {};

const Settings = (props: SettingsProps) => {
  const location = useLocation();

  const [expanded, setExpanded] = useState(location.state?.expanded);

  return (
    <>
      <div className="app-container h-screen">
        <div className="navbar">
          <Navbar
            isExpanded={expanded}
            handleExpand={(expanded) => setExpanded(expanded)}
          />
        </div>

        <div className="TopOfDocument border-b-2">
          <div className="p-2 m-3 TopOfDocument">
            <div className="flex">
              <Label
                value="Settings"
                className="flex p-1 text-xl font-medium mb-2"
                color="dark"
              />
              <CiSettings className="h-5 w-5 mt-[0.45rem]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
