import { IUser } from "@/types";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  friend: IUser;
};

const FriendCard = ({ friend }: Props) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/profile/${friend.id}`);
    window.location.href = `/profile/${friend.id}`;
  };
  return (
    <div onClick={handleNavigate} className="cursor-pointer ">
      <div className="w-24 h-24 flex flex-col items-center">
        <img
          src={friend?.avatar || "/person.jpg"}
          alt="avatar"
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex justify-between flex-1">
        <p className="font-semibold">
          {friend?.lastName} {friend?.firstName}
        </p>
      </div>
    </div>
  );
};

export default FriendCard;
