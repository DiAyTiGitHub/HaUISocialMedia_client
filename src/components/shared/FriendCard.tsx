import { IUser } from "@/types";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

type Props = {
  friend: IUser | any;
  isShowButton?: boolean;
};

const FriendCard = ({ friend, isShowButton }: Props) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/profile/${friend.id}`);
    window.location.href = `/profile/${friend.id}`;
  };
  return (
    <div onClick={handleNavigate} className={`cursor-pointer`}>
      <div className={`${isShowButton && "flex justify-between "} `}>
        <div className="flex items-center gap-3">
          <img
            src={friend?.avatar || "/person.jpg"}
            alt="avatar"
            className="profile-photo rounded-full "
          />
          <p className="font-semibold">
            {friend?.lastName} {friend?.firstName}
          </p>
        </div>
        {isShowButton && (
          <Button
            className="text-black bg-transparent border border-primary font-normal"
            onClick={handleNavigate}
          >
            Trang cá nhân
          </Button>
        )}
      </div>
    </div>
  );
};

export default FriendCard;
