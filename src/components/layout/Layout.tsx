import NavBar from "./NavBar";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main className="relative">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
