import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Label } from "flowbite-react";
import { GrCircleQuestion } from "react-icons/gr";
import { useLocation } from "react-router-dom";
import AutoRedirectHook from "../Inactivity/AutoRedirectHook";

type SettingsProps = {};

const Settings = (props: SettingsProps) => {
  useEffect(() => {
    window.history.pushState(null, "", "/login");
    window.onpopstate = function () {
      window.history.pushState(null, "", "/login");
    };
  }, []);

  const location = useLocation();

  const [expanded, setExpanded] = useState(location.state?.expanded);
  const { redirect, setRedirect } = AutoRedirectHook(
    JSON.parse(location.state.user.preference).lockDuration,
    undefined,
    expanded
  );

  return (
    <>
      {redirect}
      <div className="app-container h-screen dark:bg-darkbg-999">
        <div className="navbar">
          <Navbar
            isExpanded={expanded}
            handleExpand={(expanded) => setExpanded(expanded)}
          />
        </div>

        <div className="TopOfDocument border-b-2 dark:border-darkborder-999">
          <div className="p-2 m-3 TopOfDocument">
            <div className="flex">
              <Label
                value="About"
                className="flex p-1 text-xl font-medium mb-2 dark:text-darktext-999"
                color="dark"
              />
              <GrCircleQuestion className="h-5 w-5 mt-[0.45rem] dark:text-darktext-999" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
