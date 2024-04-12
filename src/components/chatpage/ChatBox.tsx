import { useAuth } from "@/context/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";

type ChatBoxProps = {
  chat: any;
};
const ChatBox = ({ chat }: ChatBoxProps) => {
  const { roomId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const otherMembers = chat?.participants?.filter(
    (member: any) => member.id !== currentUser?.id
  );

  const lastMessage =
    chat?.messages?.length > 0 && chat?.messages[chat?.messages.length - 1];

  const seen = lastMessage?.seenBy?.find(
    (member: any) => member.id === currentUser?.id
  );

  return (
    <div
      className={`chat-box ${chat.id === roomId ? "bg-blue-200" : ""}`}
      onClick={() => navigate(`/chats/${chat.id}`)}
    >
      <div className="chat-info">
        {chat?.isGroup ? (
          <img
            src={chat?.groupPhoto || "/assets/group.png"}
            alt="group-photo"
            className="profilePhoto"
          />
        ) : (
          <img
            src={otherMembers[0].avatar || "/person.jpg"}
            alt="profile-photo"
            className="profilePhoto"
          />
        )}

        <div className="flex flex-col gap-1">
          {chat?.roomType.name === "group" ? (
            <p className="text-base-bold">{chat?.name}</p>
          ) : (
            <p className="text-base-bold">{otherMembers[0]?.username}</p>
          )}

          {!lastMessage && (
            <p className="text-small-bold"> Bắt đầu cuộc trò truyện</p>
          )}

          <p
            className={`last-message ${
              seen ? "text-small-medium text-grey-3" : "text-small-bold"
            }`}
          >
            {lastMessage?.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
