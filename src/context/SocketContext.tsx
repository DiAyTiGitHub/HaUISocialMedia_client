import { ReactNode, createContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { Client } from "stompjs";

import { over } from "stompjs";
import SockJS from "sockjs-client";

type SockJSType = typeof SockJS;
type SocketContextType = {
  socket: any;
};
const INITIAL = {
  socket: null,
};
export const SocketContext = createContext<SocketContextType>(INITIAL);

export const SocketContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { currentUser } = useAuth();
  const [sockedState, setSocketState] = useState<Client | null>(null);

  const connect = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    setSocketState(over(Sock));
  };

  const userJoin = () => {
    var chatMessage = {
      senderName: currentUser?.id,
      status: "JOIN",
    };
    sockedState?.send("/app/public-message", {}, JSON.stringify(chatMessage));
  };

  const onConnected = () => {
    // Xử lý khi kết nối thành công
    // sockedState?.subscribe(
    //   "/user/" + currentUser?.id + "/private",
    //   onPrivateMessage
    // );
    userJoin();
  };

  const onError = (error: any) => {
    console.log(error);
  };

  useEffect(() => {
    connect;
  }, []);

  useEffect(() => {
    currentUser && sockedState?.connect({}, onConnected, onError);
  }, [currentUser, sockedState]);
  return (
    <SocketContext.Provider value={{ socket: sockedState }}>
      {children}
    </SocketContext.Provider>
  );
};
