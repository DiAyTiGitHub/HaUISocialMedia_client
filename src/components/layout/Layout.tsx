import NavBar from "./NavBar";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className=" flex flex-col">
      <NavBar />
      <div>
        <div className="relative  flex mt-10 max-padd-container ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
