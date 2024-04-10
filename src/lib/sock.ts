import { over } from "stompjs";
import SockJS from "sockjs-client";
import { useAuth } from "@/context/AuthProvider";

export var stompClient: any = null;
export const connect = () => {
  let Sock = new SockJS("http://localhost:8080/ws");
  stompClient = over(Sock);
  stompClient.connect({}, onConnected, onError);
};

const { currentUser } = useAuth();
const onConnected = () => {
  stompClient.subscribe(
    "/user/" + currentUser?.id + "/privateMessage"
    // onPrivateMessage
  );
  // userJoin();
};

// const userJoin = () => {
//   var chatMessage = {
//     senderName: userData.username,
//     status: "JOIN",
//   };
//   stompClient.send("/app/public-message", {}, JSON.stringify(chatMessage));
// };

// const onMessageReceived = (payload) => {
//   var payloadData = JSON.parse(payload.body);
//   switch (payloadData.status) {
//     case "JOIN":
//       if (!privateChats.get(payloadData.senderName)) {
//         privateChats.set(payloadData.senderName, []);
//         setPrivateChats(new Map(privateChats));
//       }
//       break;
//     case "MESSAGE":
//       publicChats.push(payloadData);
//       setPublicChats([...publicChats]);
//       break;
//   }
// };

// const onPrivateMessage = (payload) => {
//   console.log(payload);
//   var payloadData = JSON.parse(payload.body);
//   if (privateChats.get(payloadData.senderName)) {
//     privateChats.get(payloadData.senderName).push(payloadData);
//     setPrivateChats(new Map(privateChats));
//   } else {
//     let list = [];
//     list.push(payloadData);
//     privateChats.set(payloadData.senderName, list);
//     setPrivateChats(new Map(privateChats));
//   }
// };

const onError = (err: any) => {
  console.log(err);
};

// const sendValue = () => {
//   if (stompClient) {
//     var chatMessage = {
//       senderName: userData.username,
//       receiverName: "public",
//       messageBody: userData.messageBody,
//       status: "MESSAGE",
//     };
//     console.log(chatMessage);
//     stompClient.send("/app/public-message", {}, JSON.stringify(chatMessage));
//     setUserData({ ...userData, messageBody: "" });
//   }
// };

// const sendPrivateValue = () => {
//   if (stompClient) {
//     var chatMessage = {
//       senderName: userData.username,
//       receiverName: tab,
//       messageBody: userData.messageBody,
//       status: "MESSAGE",
//     };

//     if (userData.username !== tab) {
//       privateChats.get(tab).push(chatMessage);
//       setPrivateChats(new Map(privateChats));
//     }
//     stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
//     setUserData({ ...userData, messageBody: "" });
//   }
// };
