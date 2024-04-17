import { useState, useEffect, useRef } from "react";
import MessageBox from "./MessageBox";
import { Link, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthProvider";
import { useGetChatById } from "@/react-query/message";
import Loader from "../shared/Loader";
import { IUser } from "@/types";

type Props = {
  roomId: string;
};
const ChatDetails = ({ roomId }: Props) => {
  const { data: chat, isLoading: isChatLoading } = useGetChatById(
    roomId as string
  );
  console.log(roomId);
  console.log(chat);
  const [otherMembers, setOtherMembers] = useState<IUser[]>([]);
  const { currentUser } = useAuth();
  const [text, setText] = useState("");

  /* Scrolling down to the bottom when having the new message */

  const bottomRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    if (chat) {
      const orther = chat?.participants?.filter(
        (item: any) => item.id !== currentUser?.id
      );
      setOtherMembers(orther);
    }
  }, [chat]);

  console.log(otherMembers[0]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat?.messages]);

  if (currentUser === null || !chat) return;
  if (isChatLoading) return <Loader />;
  return (
    <div className="pb-20">
      <div className="chat-details">
        <div className="chat-header">
          {/* // chat?.isGroup */}
          {false ? (
            <>
              <Link to={`/chats/${1}/group-info`}>
                <img
                  src={"/group.png"}
                  alt="group-photo"
                  className="profilePhoto"
                />
              </Link>

              <div className="text">
                <p>
                  {/* {chat?.name} &#160; &#183; &#160; {chat?.members?.length}{" "}
                  members */}
                  chat name &#160; &#183; &#160; 3
                </p>
              </div>
            </>
          ) : (
            <>
              <img
                src={"/person.jpg"}
                alt="profile photo"
                className="profilePhoto"
              />
              <div className="text">
                <p>
                  {otherMembers[0]?.lastName} {otherMembers[0]?.firstName}{" "}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="chat-body">
          {chat?.messages?.map((message: any, index: number) => (
            <MessageBox
              key={index}
              message={message}
              currentUser={currentUser}
            />
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="send-message">
          <div className="prepare-message">
            <input
              type="text"
              placeholder="Viết tin nhắn..."
              className="input-field"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>

          <div>
            <Button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetails;
