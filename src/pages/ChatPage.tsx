import ChatBox from "@/components/chatpage/ChatBox";
import ListFriendChat from "@/components/chatpage/ListFriendChat";

const ChatPage = () => {
  return (
    <div className="grid grid-cols-[2fr_5fr] gap-10">
      <ListFriendChat />
      <ChatBox />
    </div>
  );
};

export default ChatPage;
