import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatBox from "./ChatBox";
import { useGetAllJoinedRooms } from "@/react-query/message";
import FriendListSkeleton from "../skeleton/FriendListSkeleton";

const ChatList = () => {
  const { data, isLoading } = useGetAllJoinedRooms();
  const [search, setSearch] = useState("");
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
          {isLoading ? (
            <FriendListSkeleton
              styles="chats h-[75vh] overflow-y-auto"
              length={5}
            />
          ) : (
            <div className="chats h-[75vh] overflow-y-auto ">
              {data?.map((chat: any) => (
                <ChatBox chat={chat} key={chat.id} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="private">
          {isLoading ? (
            <FriendListSkeleton
              styles="chats h-[75vh] overflow-y-auto"
              length={5}
            />
          ) : (
            <div className="chats h-[75vh] overflow-y-auto ">
              {data
                ?.filter((c: any) => c.roomType.name === "private")
                .map((chat: any) => (
                  <ChatBox chat={chat} key={chat.id} />
                ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="group">
          {isLoading ? (
            <FriendListSkeleton
              styles="chats h-[75vh] overflow-y-auto"
              length={5}
            />
          ) : (
            <div className="chats h-[75vh] overflow-y-auto ">
              {data
                ?.filter((c: any) => c.roomType.name !== "private")
                .map((chat: any) => (
                  <ChatBox chat={chat} key={chat.id} />
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatList;
