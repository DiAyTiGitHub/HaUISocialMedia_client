import avatar from "@/assets/avatar.png";
import { requestFriendsPagination } from "@/pages/ReqestFriendPage";
import { useAcceptFriend } from "@/react-query/relationship";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import * as apiClient from "@/react-query/query-api";
import CustomButtonFriend from "./CustomButtonFriend";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FriendResquest = () => {
  const navigate = useNavigate();
  const { acceptFriend, isLoading: isAccpectLoading } = useAcceptFriend();
  const [requestFriends, setResquestFriends] = useState([]);

  const [requestFriendPagination, setRequestFriendPagination] =
    useState<requestFriendsPagination>({
      pageIndex: 0,
      pageSize: 3,
    });

  const { mutate, isLoading } = useMutation({
    mutationFn: (requestFriendPagination: requestFriendsPagination) =>
      apiClient.getRequestFriend(requestFriendPagination),
    onSuccess: (data) => {
      setResquestFriends(data);
    },
  });

  useEffect(() => {
    mutate(requestFriendPagination);
  }, [requestFriendPagination]);
  console.log(requestFriends);

  const handleAcceptFriend = (acceptFriendId: string) => {
    acceptFriend(acceptFriendId);
  };
  if (isLoading) return <Loader />;
  return (
    <div className="mt-4">
      {requestFriends.length === 0 ? (
        <span>Không có hoạt động nào</span>
      ) : (
        <>
          <h3 className="h3-bold text-gray my-1">Lời mời kết bạn</h3>
          {requestFriends.map((friend: any) => (
            <div className="bg-white p-4 rounded-xl mb-3" key={friend.id}>
              <div className="flex gap-4 mb-4">
                <div className="profile-photo">
                  <img
                    src={friend.avatar || "/person.jpg"}
                    alt="profile-photo"
                  />
                </div>
                <div>
                  <p className="font-semibold">
                    {friend.requestSender.lastName}{" "}
                    {friend.requestSender.firstName}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CustomButtonFriend
                  handleFn={(id: string) => handleAcceptFriend(id)}
                  title="Chấp nhật"
                  titleDisable="Đã chấp nhận"
                  isLoading={isAccpectLoading}
                  id={friend.id}
                />
                <button className="btn">Từ chối</button>
              </div>
            </div>
          ))}
        </>
      )}
      <div
        className="body-bold text-center hover:text-primary cursor-pointer"
        onClick={() => navigate("/add-friends")}
      >
        Xem thêm
      </div>
    </div>
  );
};

export default FriendResquest;
