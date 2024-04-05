import { useState, useEffect, useRef } from "react";
import MessageBox from "./MessageBox";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthProvider";

const chat = {
  messages: [
    {
      text: "noi dung tin nhan",
      sender: {
        id: 1,
        username: "nguoi gui",
      },
    },
    {
      text: "noi dung tin nhan",
      sender: {
        id: 1,
        username: "nguoi gui",
      },
    },
    {
      text: "noi dung tin nhan",
      sender: {
        id: 1,
        username: "nguoi gui",
      },
    },
  ],
};

const ChatDetails = () => {
  //const [chat, setChat] = useState({});
  const [otherMembers, setOtherMembers] = useState([]);
  const { currentUser } = useAuth();
  const [text, setText] = useState("");

  // sock api

  // const [userData, setUserData] = useState({
  //   username: '',
  //   receivername: '',
  //   connected: false,
  //   messageBody: ''
  // });
  // useEffect(() => {
  // console.log(userData);
  // }, [userData]);

  // useEffect(() => {
  //   if (currentUser && chatId) getChatDetails();
  // }, [currentUser, chatId]);

  // const sendText = async () => {
  //   try {
  //     const res = await fetch("/api/messages", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         chatId,
  //         currentUserId: currentUser._id,
  //         text,
  //       }),
  //     });

  //     if (res.ok) {
  //       setText("");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   pusherClient.subscribe(chatId);

  //   const handleMessage = async (newMessage) => {
  //     setChat((prevChat) => {
  //       return {
  //         ...prevChat,
  //         messages: [...prevChat.messages, newMessage],
  //       };
  //     });
  //   };

  //   pusherClient.bind("new-message", handleMessage);

  //   return () => {
  //     pusherClient.unsubscribe(chatId);
  //     pusherClient.unbind("new-message", handleMessage);
  //   };
  // }, [chatId]);

  /* Scrolling down to the bottom when having the new message */

  const bottomRef = useRef(null);

  // useEffect(() => {
  //   bottomRef.current?.scrollIntoView({
  //     behavior: "smooth",
  //   });
  // }, [chat?.messages]);

  if (currentUser === null) return;
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
                <p>order people</p>
              </div>
            </>
          )}
        </div>

        <div className="chat-body">
          {chat?.messages?.map((message, index) => (
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
