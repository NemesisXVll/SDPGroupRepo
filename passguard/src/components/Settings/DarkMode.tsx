import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserService from "../../utils/userService";
import { Flowbite } from "flowbite-react";

const userService = new UserService();

interface DarkModeProps {}

const DarkMode = (props: DarkModeProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state.user;

  const preference = JSON.parse(user.preference);

  async function handleThemeChange(e: any): Promise<void> {
    preference.theme = e.target.value;
    const updatedUser = await userService.updateUserPreference(
      user.userId,
      preference
    );
    navigate("/settings", { state: { user: updatedUser } });
  }

  return (
    <>
      <h2 className="m-2 font-bold text-lg dark:text-darktext-999">
        Appearance
      </h2>
      <div className="p-5 flex items-center justify-between  rounded-xl bg-gray-100 border border-gray-200 shadow-md dark:border-darkborder-999 dark:bg-darkcards-999">
        <div className="flex flex-col">
          <span className="font-semibold pb-2 dark:text-darktext-999">
            Theme
          </span>
          <span className="font-nunito text-gray-500 dark:text-darksubtext-999">
            <span className="font-semibold text-sm">
              Theme changes PassGuard appearance to the theme chosen.
            </span>
          </span>
        </div>
        <div className="">
          <select
            className=" bg-gray-900 text-white font-medium rounded-lg w-[13rem] dark border-none dark:text-darktext-999"
            name="theme"
            id="theme-select"
            value={preference.theme}
            onChange={handleThemeChange}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default DarkMode;
