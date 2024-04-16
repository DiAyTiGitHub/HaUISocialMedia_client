import ChatDetails from "@/components/chatpage/ChatDetails";
import ChatList from "@/components/chatpage/ChatList";
import NavBar from "@/components/layout/NavBar";
import { useParams } from "react-router-dom";

const ChatDetailPage = () => {
  const { roomId } = useParams();

  return (
    <>
      <NavBar />
      <div className="main-container relative">
        <div className="w-1/3 max-lg:hidden">
          <ChatList />
        </div>
        <div className="w-2/3 max-lg:w-full">
          <ChatDetails roomId={roomId as string} />
        </div>
      </div>
    </>
  );
};

export default ChatDetailPage;
