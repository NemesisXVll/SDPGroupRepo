import appLogo from "../assets/icons/navbar/appLogo.svg";
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import navbarItems from "../data/navbarItems";
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserService from "../utils/userService";
import Kebab from "./CredentialSection/Kebab";
import { Modal, Tooltip } from "flowbite-react";
import SignOutBTN from "./Form/Button";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import Button from "./Form/Button";
import { IoExitOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";

const userService = new UserService();

type NavbarProps = {
  updatedUser?: any;
  isExpanded?: boolean;
  handleExpand?: (expandedVal: any) => void;
};

const NavbarContext = createContext<any>(null);
function Navbar(props: NavbarProps) {
  const [expanded, setExpanded] = useState(props.isExpanded);
  const [data, setData] = useState<any>({});
  const [openModal, setOpenModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.user;

  useEffect(() => {
    props.handleExpand && props.handleExpand(expanded);
    userService.getUserDataById(user.userId).then((data) => {
      setData(data);
    });
  }, [props.updatedUser]);

  function handleOnClick(item: {
    name: string;
    icon: string;
    path: string;
  }): void {
    if (item.path) {
      navigate(item.path, { replace: true, state: { expanded, user } });
    }
  }

  function handleSignoutBTN(event: any): void {
    setOpenModal(false);
    navigate("/login");
  }

  return (
    <>
      <aside className="h-screen">
        <nav className="h-full flex flex-col bg-black shadow-sm rounded-tr-2xl">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src={appLogo}
              className={`overflow-hidden transition-all ${
                expanded ? "p-2 w-50" : "w-0"
              }`}
              alt="app logo"
            />
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-1.5 rounded-lg text-white hover:bg-yellow-400 hover:text-black transition-all duration-300 cursor-pointer"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>
          <NavbarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">
              {navbarItems.map((item, index) => (
                <li
                  onClick={(event: any) => {
                    event.preventDefault();
                    handleOnClick(item);
                  }}
                  key={index}
                  className={`
                        relative flex items-center py-3 px-3 my-1
                        font-medium rounded-md cursor-pointer
                        text-white
                        hover:bg-yellow-400 hover:text-black
                          group  border-b-2 border-gray-700 transition-all duration-100
                        `}
                >
                  <img src={item.icon} alt={item.name} className="w-6 h-6" />
                  <span
                    className={`overflow-hidden transition-all ${
                      expanded ? "w-52 ml-3" : "w-0"
                    }`}
                  >
                    {item.name}
                  </span>
                  {!expanded && (
                    <div
                      className={`
                            absolute left-full rounded-md px-2 py-1 ml-6 z-20
                            bg-gray-200 text-black text-sm
                            invisible opacity-20 -translate-x-3 transition-all
                            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                            `}
                    >
                      {item.name}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </NavbarContext.Provider>

          {expanded ? (
            <Button
              value="lockApp"
              type="button"
              onClick={() =>
                navigate("/lock", {
                  state: { user, expanded: expanded, clickedLockBTN: true },
                })
              }
              style="bg-white text-black hover:bg-yellow-400 w-[11rem] ml-[3.3rem] mb-2"
            >
              Lock App
            </Button>
          ) : (
            <CiLock
              onClick={() =>
                navigate("/lock", {
                  state: { user, expanded: expanded, clickedLockBTN: true },
                })
              }
              className="relative flex items-center  w-10 h-10 mb-2 ml-3 p-1
                        font-medium rounded-md cursor-pointer
                        text-white border-b-2 border-gray-700
                        hover:bg-yellow-400 hover:text-black
                          group  transition-all duration-100"
            ></CiLock>
          )}

          <div className="border-t border-gray-700 flex p-3">
            <img
              src={data.picture}
              alt="profile picture"
              className="w-10 h-10 rounded-md"
            />
            <div
              className={`
                    flex justify-between items-center
                    overflow-hidden transition-all ${
                      expanded ? "w-52 ml-3" : "w-0"
                    }
                    `}
            >
              <div className="leading-4">
                <h4 className="font-semibold text-white text-sm">
                  {data.firstName + " " + data.lastName}
                </h4>
                <span className="text-xs text-gray-600">{data.email}</span>
              </div>
              <Tooltip content="Signout" placement="bottom" className="ml-3">
                <IoExitOutline
                  className="text-white ml-8 w-24 h-7 hover:text-yellow-400 hover:prompt-2 transition-all duration-300 cursor-pointer"
                  onClick={() => setOpenModal(true)}
                ></IoExitOutline>
              </Tooltip>
            </div>
          </div>
        </nav>
      </aside>

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        dismissible
      >
        <Modal.Header />
        <Modal.Body>
          {" "}
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-500 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-nunito text-gray-500 dark:text-gray-400">
              Are you sure you want to sign out?
            </h3>
            <div className="flex justify-center gap-4">
              <Button value="Cancel" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
              <Button value="confirmsignout" onClick={handleSignoutBTN}>
                Sign Out
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Navbar;
