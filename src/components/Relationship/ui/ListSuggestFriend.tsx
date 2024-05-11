import NoData from "@/components/shared/NoData";
import { IUser } from "@/types";
import { Link } from "react-router-dom";
import CustomButtonFriend from "../CustomButtonFriend";
import { useStore } from "@/stores";
import MutualFriends from "@/components/User/ui/MutualFriend";

type Props = {
  suggestFriends: any;
};
const ListSuggestFriend = ({ suggestFriends }: Props) => {
  const { relationshipStore } = useStore();
  console.log(suggestFriends);

  const { addFriend } = relationshipStore;
  return (
    <div className=" grid grid-cols-2 gap-5 my-10">
      {!suggestFriends || suggestFriends.length === 0 ? (
        <NoData title="Chưa có bạn bè gợi ý" style="h-[100px] w-[100px]" />
      ) : (
        suggestFriends.map((friend: IUser) => (
          <Link
            key={friend?.id}
            to={`/profile/${friend?.id}`}
            className="cursor-pointer flex items-center gap-5 p-3 bg-blue-2 rounded-xl w-full"
          >
            <div className="flex justify-between items-center flex-1 ">
              <div className="flex items-center gap-3">
                <img
                  src={friend.avatar || "/person.jpg"}
                  alt="avatar"
                  className="size-16 rounded-full object-cover"
                />

                <div className="flex flex-col gap-2">
                  <p className=" font-bold">
                    {friend.lastName} {friend.firstName}
                  </p>
                  {friend?.mutualFriends?.length > 0 && (
                    <MutualFriends mutualFriends={friend?.mutualFriends} />
                  )}
                </div>
              </div>

              <CustomButtonFriend
                icon="UserPlus"
                handleFn={addFriend}
                title="Thêm bạn bè"
                message="Đã gửi lời mời"
                id={friend.id}
              />
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default ListSuggestFriend;
