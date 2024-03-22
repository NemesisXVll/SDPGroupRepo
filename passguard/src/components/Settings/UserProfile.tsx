import ManagePassword from "./ManagePassword";
import ManageEmail from "./ManageEmail";
import ManageUserProfile from "./ManageUserProfile";
import WipeAccount from "./WipeAccount";

type UserProfileProps = {
  userUpdated?: any;
};

const UserProfile = (props: UserProfileProps) => {
  return (
    <>
      <div className="m-0 p-0 box-border">
        <ManageUserProfile userUpdated={props.userUpdated}></ManageUserProfile>

        <div className="mt-4">
          <ManageEmail></ManageEmail>
        </div>

        <div className="mt-4">
          <ManagePassword userUpdated={props.userUpdated}></ManagePassword>
        </div>

        <div className="mt-4">
          <WipeAccount></WipeAccount>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
