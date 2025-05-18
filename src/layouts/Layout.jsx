import { Outlet } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  
  return (
    <div>
      <div className="flex max-h-screen max-w-[1740px] mx-auto">
      <Navbar />
        <div>
          <Sidebar />
        </div>
        <div className="w-full pt-[50px] lg:min-h-[calc(100vh)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
