import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Accordion, Label, Tabs } from "flowbite-react";
import { CiSettings } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import AutoRedirectHook from "../Inactivity/AutoRedirectHook";
import { HiAdjustments, HiClipboardList } from "react-icons/hi";
import { HiUserCircle } from "react-icons/hi2";
import { MdDashboard } from "react-icons/md";
import { PiPasswordFill } from "react-icons/pi";
import { GrStorage } from "react-icons/gr";
import ManagePassword from "./ManagePassword";



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
						<div className="flex border border-t-0 border-l-0 border-r-0 border-b-gray-300 m-5">
							<Label
								value=" ⚙ Settings"
								className="flex p-1 text-3xl font-medium mb-2"
								color="dark"
							/>
						</div>
						<Tabs aria-label="Default tabs" style="default">
							<Tabs.Item title="Manage Profile" icon={HiUserCircle}>
								Change personal info here
							</Tabs.Item>
              <Tabs.Item title="Password" icon={PiPasswordFill}>
                <ManagePassword></ManagePassword>
							</Tabs.Item>
							<Tabs.Item title="Manage credentials" icon={GrStorage}>
							Export/Import/Erase All Credentials Here
							</Tabs.Item>
						</Tabs>
					</div>
				</div>
			</div>
		</>
	);
};

export default Settings;
