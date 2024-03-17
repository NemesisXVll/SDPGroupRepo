import React, { useEffect } from "react";
import loginImg from "../../assets/icons/common/appLogo.svg";
import { useNavigate } from "react-router-dom";
import Button from "../Form/Button";
import { FcPrevious } from "react-icons/fc";

const SecurityQuestion: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState(null, "", "/login");
    window.onpopstate = function () {
      window.history.pushState(null, "", "/login");
    };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full overflow-hidden">
      <div className="hidden sm:block">
        <img
          className="w-full h-full object-cover"
          src={loginImg}
          alt="Signup visual"
        />
      </div>
      <div className="bg-gray-100 flex flex-col justify-center">
        <form className="max-w-[400px] min-w-[450px] w-full mx-auto bg-white p-4 shadow-md">
          <FcPrevious
            className="w-8 h-8 hover:text-indigo-600 cursor-pointer"
            onClick={() => navigate("/login", {})}
          ></FcPrevious>
          <div className="flex items-center justify-center">
            <h2 className="text-4xl text-center py-2 font-bold font-nunito">
              📝 Security
            </h2>
            <h2 className="text-4xl text-center py-2 font-bold font-nunito text-yellow-400">
              Question&nbsp;
            </h2>
          </div>

          {/* Submit Button */}
          <div className="mt-7">
            <Button type="submit" value="createAccount">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SecurityQuestion;
