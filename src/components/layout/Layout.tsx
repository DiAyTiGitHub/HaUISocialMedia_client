import React from "react";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex flex-col">
      <NavBar />
      <div>
        <div className="relative min-h-screen flex mt-10 max-padd-container ">
          <Sidebar />
          {children}
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
