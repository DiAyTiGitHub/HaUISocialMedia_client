import { memo, useEffect } from "react";
import NavBar from "./NavBar";

import { Outlet } from "react-router-dom";
import { observer } from "mobx-react";
import { useStore } from "@/stores";

function Layout() {
  const { authStore } = useStore();
  const { getLoggedInUser, connectToSocket, stompClient } = authStore;

  useEffect(function () {
    async function initializeSocket() {
      const currentUser = getLoggedInUser();

      if (currentUser && currentUser?.id && currentUser?.role === "USER" && !stompClient) {
        //start connecting to socket
        await connectToSocket();
      }
    }

    initializeSocket();

  }, [getLoggedInUser()?.id]);

  return (
    <>
      <NavBar />
      <main className="relative">
        <Outlet />
      </main>
    </>
  );
};

export default memo(observer(Layout));
