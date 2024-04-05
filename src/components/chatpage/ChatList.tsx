import { useEffect, useState } from "react";
import { chats } from "@/mockData";
import ChatBox from "./ChatBox";
type ChatListProps = {
  currentChatId?: string;
};
type UserType = {
  _id: string;
  username: string;
  profileImage: string;
};

type MessageType = {
  chat: string;
  sender: UserType;
  text: string;
  createdAt: Date;
  seenBy: UserType[];
};
type ChatType = {
  members: UserType[];
  messages: MessageType[];
};
const ChatList = ({ currentChatId }: ChatListProps) => {
  //const currentUser = sessions?.user;
  const currentUser = {
    _id: "1",
    username: "Thanh Thuan",
    profileImage:
      "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  };
  const [loading, setLoading] = useState(true);
  //const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");

  // const getChats = async () => {
  //   try {
  //     const res = await fetch(
  //       search !== ""
  //         ? `/api/users/${currentUser._id}/searchChat/${search}`
  //         : `/api/users/${currentUser._id}`
  //     );
  //     const data = await res.json();
  //     setChats(data);
  //     setLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   if (currentUser) {
  //     getChats();
  //   }
  // }, [currentUser, search]);

  // useEffect(() => {
  //   if (currentUser) {
  //     pusherClient.subscribe(currentUser._id);

  //     const handleChatUpdate = (updatedChat) => {
  //       setChats((allChats) =>
  //         allChats.map((chat) => {
  //           if (chat._id === updatedChat.id) {
  //             return { ...chat, messages: updatedChat.messages };
  //           } else {
  //             return chat;
  //           }
  //         })
  //       );
  //     };

  //     const handleNewChat = (newChat) => {
  //       setChats((allChats) => [...allChats, newChat]);
  //     }

  //     pusherClient.bind("update-chat", handleChatUpdate);
  //     pusherClient.bind("new-chat", handleNewChat);

  //     return () => {
  //       pusherClient.unsubscribe(currentUser._id);
  //       pusherClient.unbind("update-chat", handleChatUpdate);
  //       pusherClient.unbind("new-chat", handleNewChat);
  //     };
  //   }
  // }, [currentUser]);

  return (
    <div className="chat-list">
      <input
        placeholder="Tìm kiếm cuộc trò chuyện..."
        className="input-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="chats">
        {chats?.map((chat, index) => (
          <ChatBox chat={chat} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
