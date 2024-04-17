import NavBar from "./NavBar";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main className="px-5 relative">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
