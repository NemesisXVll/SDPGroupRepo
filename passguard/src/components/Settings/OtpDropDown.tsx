import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserService from "../../utils/userService";

const userService = new UserService();

interface OtpDropDownProps {}

const OtpDropDown = (props: OtpDropDownProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state.user;

  const [openModal, setOpenModal] = useState(false);

  const preference = JSON.parse(user.preference);

  async function handleLoginOTPChange(e: any): Promise<void> {
    preference.loginOtp = e.target.value;
    const updatedUser = await userService.updateUserPreference(
      user.userId,
      preference
    );
    navigate("/settings", { state: { user: updatedUser } });
  }

  async function handleForgetPassOTPChange(e: any): Promise<void> {
    preference.forgetPassOtp = e.target.value;
    const updatedUser = await userService.updateUserPreference(
      user.userId,
      preference
    );
    navigate("/settings", { state: { user: updatedUser } });
  }

  return (
    <>
      <div className="p-5 flex items-center justify-between rounded-t-xl rounded-b-none bg-gray-100 border border-gray-200 shadow-md">
        <div className="flex flex-col">
          <span className="font-semibold pb-2">Login OTP</span>
          <span className="font-nunito text-gray-500">
            <span className="font-semibold text-sm">
              Choose the type of authentication when logging in.
            </span>
          </span>
        </div>
        <div className="">
          <select
            className=" bg-gray-900 text-white font-medium rounded-lg w-[13rem] dark border-none"
            name="loginOtp"
            id="loginOtp-select"
            value={preference.loginOtp}
            onChange={handleLoginOTPChange}
          >
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>

      <div className="p-5 flex items-center justify-between rounded-t-none rounded-b-3xl bg-gray-100 border border-gray-200 shadow-md">
        <div className="flex flex-col">
          <span className="font-semibold pb-2">
            Forget Password & Profile Management OTP
          </span>
          <span className="font-nunito text-gray-500">
            <span className="font-semibold text-sm">
              Choose the type of authentication when you forget your password or
              for using any of the wipe features (e.g., wipe account, wipe
              credentials, and wipe documents).
            </span>
          </span>
        </div>
        <div className="">
          <select
            className=" bg-gray-900 text-white font-medium rounded-lg w-[13rem] dark border-none"
            name="forgetPassOTP"
            id="forgetPassOTP-select"
            value={preference.forgetPassOtp}
            onChange={handleForgetPassOTPChange}
          >
            <option value="email">Email</option>
            <option value="sms">SMS</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default OtpDropDown;