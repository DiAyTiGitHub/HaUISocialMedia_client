import ChatDetails from "@/components/chatpage/ChatDetails";
import ChatList from "@/components/chatpage/ChatList";
import NavBar from "@/components/layout/NavBar";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ChatDetailPage = () => {
  // const seenMessages = async () => {
  //   try {
  //     await fetch(`/api/chats/${chatId}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         currentUserId: currentUser._id,
  //       }),
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   if (currentUser && chatId) seenMessages();
  // }, [currentUser, chatId]);

  return (
    <>
      <NavBar />
      <div className="main-container relative">
        <div className="w-1/3 max-lg:hidden">
          <ChatList />
        </div>
        <div className="w-2/3 max-lg:w-full">
          {/* // chatId */}
          <ChatDetails />
        </div>
      </div>
    </>
  );
};

export default ChatDetailPage;
