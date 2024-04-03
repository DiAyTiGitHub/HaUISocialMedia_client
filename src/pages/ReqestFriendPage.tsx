import CustomButtonFriend from "@/components/shared/CustomButtonFriend";
import SidebarFriendPage from "@/components/shared/SidebarFriendPage";
import * as apiClient from "@/react-query/query-api";
import { useAcceptFriend } from "@/react-query/relationship";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

export type requestFriendsPagination = {
  pageIndex: number;
  pageSize: number;
};

const RequestFriendPage = () => {
  const { acceptFriend, isLoading: isAccpectLoading } = useAcceptFriend();
  const [requestFriends, setResquestFriends] = useState([]);

  const [requestFriendPagination, setRequestFriendPagination] =
    useState<requestFriendsPagination>({
      pageIndex: 0,
      pageSize: 10,
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

  if (isLoading) return <span>Loading</span>;
  return (
    <div className="grid grid-cols-[1fr_3fr] mt-5">
      <SidebarFriendPage />
      <div className="flex flex-col gap-10 mx-5">
        <div className="flex-1 p-5">
          <div className="mb-5">
            <h3 className="h3-bold mb-5">Danh sách lời mời kết bạn</h3>
            <div className="flex items-center bg-white max-w-max  rounded-xl">
              <input
                type="text"
                placeholder="Tìm bạn bè..."
                className="input input-field"
              />
              <button className="btn btn-primary">
                <Search />
              </button>
            </div>
          </div>

          {!requestFriends || requestFriends.length === 0 ? (
            <span>Không có lời mời</span>
          ) : (
            <div className="grid grid-cols-2 gap-5 my-10">
              {requestFriends.map((friend: any) => (
                <div
                  key={friend.id}
                  className="flex items-center gap-5 p-3 bg-white border border-light-2 rounded-xl"
                >
                  <img
                    src={friend.avatar || "/person.jpg"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex justify-between flex-1">
                    <p className="font-semibold">
                      {friend.requestSender.lastName}{" "}
                      {friend.requestSender.firstName}
                    </p>

                    {/* <Button
                      className="bg-blue-600 hover:bg-blue-500"
                      onClick={() => handleAcceptFriend(friend.id)}
                    >
                      Chấp nhận
                    </Button> */}
                    <CustomButtonFriend
                      handleFn={(id: string) => handleAcceptFriend(id)}
                      title="Chấp nhật"
                      titleDisable="Đã chấp nhận"
                      isLoading={isAccpectLoading}
                      id={friend.id}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestFriendPage;
