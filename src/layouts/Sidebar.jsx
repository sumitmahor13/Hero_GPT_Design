import { useState } from "react";
import { HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi2";
import { PiPlus, PiImages, PiSquaresFour, PiGear, PiOpenAiLogo, PiUserPlus,} from "react-icons/pi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setOpenMenu(null);
  };

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  const menuItems = [
    {
      name: "Library",
      icon: <PiImages size={22} />,
    },
    {
      name: "Prompts",
      icon: <PiOpenAiLogo size={22} />,
    },
    {
      name: "Explore GPTs",
      icon: <PiSquaresFour size={22} />,
    },
    {
      name: "Settings",
      icon: <PiGear size={22} />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div
        className={`bg-white transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-16"
        } min-w-[4rem] h-full relative`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4.5 right-[-12px] z-10"
        >
          {isOpen ? (
            <HiChevronDoubleLeft size={18} />
          ) : (
            <HiChevronDoubleRight size={18} />
          )}
        </button>

        {/* Logo */}
        <div className="flex items-center text-black justify-center h-16 font-bold text-xl px-4">
          {isOpen ? (
            <div className="absolute top-3.5 z-10 text-2xl transition-all duration-200 ease-in delay-200 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              Hero GPT 2.0
            </div>
          ) : (
            <div className="absolute top-3.5 z-10 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              2.0
            </div>
          )}
        </div>

        {/* Menu */}
        <nav className="mt-4 px-2 h-full lg:h-[87vh] flex flex-col justify-between">
          <div>
            <div className="flex items-center item-shadow gap-3 px-3 py-2 rounded-md transition-colors duration-200 text-sm font-medium">
              <span className="text-lg">
                <PiPlus size={22} />
              </span>
              {isOpen && <span>New Chat</span>}
            </div>
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                <div className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 text-sm font-medium">
                  <span className="text-lg">{item.icon}</span>
                  {isOpen && <span>{item.name}</span>}
                </div>

                {!isOpen && (
                  <span className="absolute left-16 top-2.5 z-50 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-xs rounded px-2 py-1 pointer-events-none transition-all duration-300">
                    {item.name}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="flex bg-black text-white align-bottom gap-3 px-3 py-2 rounded-md transition-colors duration-200 text-sm font-medium">
            <span className="text-lg">
              <PiUserPlus size={22} />
            </span>
            {isOpen && <span>Sign up / Log in</span>}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
