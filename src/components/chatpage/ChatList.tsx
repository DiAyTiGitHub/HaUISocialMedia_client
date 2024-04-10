import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { chats } from "@/mockData";
import ChatBox from "./ChatBox";
import { useGetAllJoinedRooms } from "@/react-query/message";
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
  // const { data } = useGetAllJoinedRooms();
  // console.log(data);

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
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="private">Riêng tư</TabsTrigger>
          <TabsTrigger value="group">Nhóm</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="chats h-[75vh] overflow-y-auto ">
            {chats?.map((chat, index) => (
              <ChatBox chat={chat} currentUser={currentUser} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="private">Get chat private</TabsContent>
        <TabsContent value="group">get group chat</TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatList;
