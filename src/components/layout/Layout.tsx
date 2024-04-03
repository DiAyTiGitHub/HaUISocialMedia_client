import NavBar from "./NavBar";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main className=" container relative mt-10">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
