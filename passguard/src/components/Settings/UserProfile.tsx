import ManagePassword from "./ManagePassword";
import ManageEmail from "./ManageEmail";
import ManageUserProfile from "./ManageUserProfile";
import WipeAccount from "./WipeAccount";
import TrashDuration from "./TrashDuration";
import Autolock from "./Autolock";
import OtpDropDown from "./OtpDropDown";
import DarkMode from "./DarkMode";

type UserProfileProps = {
  userUpdated?: any;
};

const UserProfile = (props: UserProfileProps) => {
  return (
    <>
      <div>
        <div>
          <ManageUserProfile
            userUpdated={props.userUpdated}
          ></ManageUserProfile>

          <div className="mt-4">
            <ManageEmail></ManageEmail>
            <WipeAccount></WipeAccount>
          </div>

          <div className="Appearance">
            <DarkMode></DarkMode>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
