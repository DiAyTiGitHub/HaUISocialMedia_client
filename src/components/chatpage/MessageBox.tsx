import { IUser } from "@/types";
type MessageType = {
  text: string;
  sender: {
    id: string;
    username: string;
  };
};

type MessageBoxProps = {
  currentUser: IUser;
  message: MessageType;
};

const MessageBox = ({ message, currentUser }: MessageBoxProps) => {
  return message?.sender?.id !== currentUser.id ? (
    <div className="message-box">
      <img
        src="/person.jpg"
        alt="profile photo"
        className="message-profilePhoto"
      />
      <div className="message-info">
        <p className="message-text">{message?.text}</p>
      </div>
    </div>
  ) : (
    <div className="message-box justify-end">
      <div className="message-info items-end">
        <p className="message-text-sender">{message?.text}</p>
      </div>
    </div>
  );
};

export default MessageBox;
