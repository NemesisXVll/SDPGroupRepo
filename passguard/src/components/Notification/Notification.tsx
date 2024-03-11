import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Label } from "flowbite-react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useLocation } from "react-router-dom";
import AutoRedirectHook from "../Inactivity/AutoRedirectHook";

type NotificationProps = {};

const Notification = (props: NotificationProps) => {
  useEffect(() => {
    window.history.pushState(null, "", "/login");
    window.onpopstate = function () {
      window.history.pushState(null, "", "/login");
    };
  }, []);

  const location = useLocation();

  const [expanded, setExpanded] = useState(location.state?.expanded);
  const { redirect, setRedirect } = AutoRedirectHook(
    undefined,
    undefined,
    expanded
  );

  return (
    <>
      {redirect}
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
                value="Notifications"
                className="flex p-1 text-xl font-medium mb-2"
                color="dark"
              />
              <IoIosNotificationsOutline className="h-5 w-5 mt-[0.45rem]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
