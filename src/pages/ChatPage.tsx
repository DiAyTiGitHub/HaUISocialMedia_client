import ChatList from "@/components/chatpage/ChatList";
import Contact from "@/components/chatpage/Contact";
import NavBar from "@/components/layout/NavBar";

const ChatPage = () => {
  return (
    <>
      <NavBar />
      <div className="relative">
        <div className="main-container">
          <div className="w-1/3 max-lg:w-1/2 max-md:w-full">
            <ChatList />
          </div>
          <div className="w-2/3 max-lg:w-1/2 max-md:hidden">
            <Contact />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
