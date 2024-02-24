import appLogo from "../assets/icons/navbar/appLogo.svg";
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import navbarItems from "../data/navbarItems";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type NavbarProps = {
  isExpanded?: boolean;
  handleExpand?: (expandedVal: any) => void;
};

const NavbarContext = createContext<any>(null);
function Navbar(props: NavbarProps) {
  const [expanded, setExpanded] = useState(props.isExpanded);

  const location = useLocation();
  const user = location.state.user;

  useEffect(() => {
    props.handleExpand && props.handleExpand(expanded);
  }, [expanded]);

  return (
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
                key={index}
                className={`
                        relative flex items-center py-3 px-3 my-1
                        font-medium rounded-md cursor-pointer
                        text-white
                        hover:bg-yellow-400 hover:text-black
                          group
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

        <div className="border-t flex p-3">
          <img
            src="https://source.unsplash.com/100x100/?Rock"
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
              <h4 className="font-semibold text-white">{JSON.parse(user.data).firstName + " " + JSON.parse(user.data).lastName}</h4>
              <span className="text-xs text-gray-600">{user.email}</span>
            </div>
            <MoreVertical size={20} color="white" />
          </div>
        </div>
      </nav>
    </aside>
  );
}
export default Navbar;