import Icon from "@/components/shared/Icon";
import NoData from "@/components/shared/NoData";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types";
import { useNavigate } from "react-router-dom";

type Props = {
  friends: any;
};
const ListFriend = ({ friends }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      {!friends || friends.length === 0 ? (
        <NoData title="Chưa có bạn bè nào" style="h-[100px] w-[100px]" />
      ) : (
        <div className="grid md:grid-cols-2 gap-3 my-10">
          {friends.map((friend: IUser) => (
            <div
              key={friend.id}
              className="flex items-center gap-5 p-3 bg-white  rounded-xl cursor-pointer"
              onClick={() => navigate(`/profile/${friend.id}`)}
            >
              <div className="flex justify-between flex-1">
                <div className="flex items-center gap-3">
                  <img
                    src={friend.avatar || "/person.jpg"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <p className="font-medium">
                    {friend.lastName} {friend.firstName}
                  </p>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-500 flex gap-3 items-center">
                  <Icon name="UserRoundCheck" />
                  Bạn bè
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ListFriend;
