import appLogo from "../assets/icons/navbar/appLogo.svg";
import { ChevronFirst, ChevronLast, Divide, MoreVertical } from 'lucide-react';
import navbarItems from '../data/navbarItems';
import React, { createContext, useState } from "react";

type NavbarProps = {
    isactive: boolean;
}
const NavbarContext = createContext<any>(null);
const Navbar: React.FC<NavbarProps> = () => { 
    const [expanded, setExpanded] = useState(true);
    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-black shadow-sm rounded-tr-2xl">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img src={appLogo}
                        className={`overflow-hidden transition-all ${expanded ? "p-2 w-50" : "w-0"}`}
                        alt="app logo" />
                    <button onClick={() => setExpanded(curr => !curr)} className="p-1.5 rounded-lg text-white hover:bg-yellow-400 hover:text-black transition-all duration-300 cursor-pointer">
                        {expanded? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>
                <NavbarContext.Provider value={{expanded}}>
                <ul className="flex-1 px-3">
                    {navbarItems.map((item, index) => (
                        <li key={index} className={`
                        relative flex items-center py-3 px-3 my-1
                        font-medium rounded-md cursor-pointer
                        text-white
                        hover:bg-yellow-400 hover:text-black
                          group
                        `}>
                            <img src={item.icon} alt={item.name} className="w-6 h-6" />
                            <span className={`overflow-hidden transition-all ${
                                expanded ? "w-52 ml-3" : "w-0"
                                }`}>{item.name}</span>
                            {!expanded && (
                                <div
                                    className={`
                            absolute left-full rounded-md px-2 py-1 ml-6
                            bg-gray-200 text-black text-sm
                            invisible opacity-20 -translate-x-3 transition-all
                            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                            `}>{item.name}</div>)}
                        </li>
                    ))}
                    </ul>
                    </NavbarContext.Provider>
                
                <div className="border-t flex p-3">
                    <img src="https://source.unsplash.com/100x100/?Rock"
                        alt="profile picture"
                        className="w-10 h-10 rounded-md" />
                    <div className={`
                    flex justify-between items-center
                    overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
                    `}> 
                        <div className="leading-4">
                            <h4 className="font-semibold text-white">Youssef Aly</h4>
                            <span className="text-xs text-gray-600">email.com</span>
                        </div>   
                        <MoreVertical size={20} color="white"/>
                    </div>
                </div>
            </nav>
     </aside>   
    )
}
export default Navbar;


