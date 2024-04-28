import { useEffect, useState } from "react";
import CustomButtonFriend from "./CustomButtonFriend";
import { useNavigate } from "react-router-dom";
import FriendListSkeleton from "../skeleton/FriendListSkeleton";
import { SearchObjectType } from "@/types";
import { useStore } from "@/stores";

const FriendResquest = () => {
  const navigate = useNavigate();
  const { relationshipStore } = useStore();
  const { getPendingFriendRequests, acceptFriend, unAcceptFriend } =
    relationshipStore;
  const [isLoading, setIsLoading] = useState(false);
  const [requestFriends, setRequestFriends] = useState<any[]>([]);

  const [paging] = useState<SearchObjectType>({
    pageIndex: 1,
    pageSize: 3,
  });

  useEffect(() => {
    const handleGetRequestFriend = async () => {
      setIsLoading(true);
      try {
        const data = await getPendingFriendRequests(paging);
        setRequestFriends(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    handleGetRequestFriend();
  }, []);

  if (isLoading)
    return <FriendListSkeleton length={3} styles="flex flex-col gap-2" />;
  return (
    <div className="mt-4">
      <h2 className="text-body-medium mb-2">Lời mời kết bạn</h2>
      {requestFriends.length === 0 ? (
        <span>Không có hoạt động nào</span>
      ) : (
        <>
          {requestFriends.map((friend: any) => (
            <div className="bg-white p-4 rounded-xl mb-3" key={friend?.id}>
              <div className="flex items-center gap-4 mb-4">
                <div className="profile-photo">
                  <img
                    src={friend.avatar || "/person.jpg"}
                    alt="profile-photo"
                  />
                </div>
                <div>
                  <p className="font-medium">
                    {friend?.requestSender?.lastName}{" "}
                    {friend?.requestSender?.firstName}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CustomButtonFriend
                  handleFn={acceptFriend}
                  title="Chấp nhật"
                  message="Đã chấp nhận"
                  id={friend.id}
                />
                <CustomButtonFriend
                  handleFn={unAcceptFriend}
                  title="Từ chối"
                  message="Đã từ chối"
                  id={friend.id}
                />
              </div>
            </div>
          ))}
          <div
            className="body-bold text-center hover:text-primary cursor-pointer"
            onClick={() => navigate("/add-friends")}
          >
            Xem thêm
          </div>
        </>
      )}
    </div>
  );
};

export default FriendResquest;