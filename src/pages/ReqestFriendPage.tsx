import CustomButtonFriend from "@/components/shared/CustomButtonFriend";
import Loader from "@/components/shared/Loader";
import SidebarFriendPage from "@/components/shared/SidebarFriendPage";
import * as apiClient from "@/react-query/query-api";
import { useAcceptFriend } from "@/react-query/relationship";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useMutation } from "react-query";

export type requestFriendsPagination = {
  pageIndex: number;
  pageSize: number;
};

const RequestFriendPage = () => {
  const { ref, inView } = useInView();
  const { acceptFriend, isLoading: isAccpectLoading } = useAcceptFriend();
  const [requestFriends, setResquestFriends] = useState<any[]>([]);
  const [showLoadMore, setShowLoadMore] = useState<boolean>(true);
  const [requestFriendPagination, setRequestFriendPagination] =
    useState<requestFriendsPagination>({
      pageIndex: 0,
      pageSize: 10,
    });

  const { mutate, isLoading } = useMutation(apiClient.getRequestFriend, {
    onSuccess: async (data: any) => {
      if (data && data.length > 0) {
        setRequestFriendPagination({
          pageSize: requestFriendPagination.pageSize,
          pageIndex: requestFriendPagination.pageIndex + 1,
        });
        setResquestFriends((prev) => [...prev, ...data]);
      } else {
        if (
          !data ||
          data.length === 0 ||
          data.length < requestFriendPagination.pageSize
        )
          setShowLoadMore(false);
      }
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });

  const handleGetData = (pagination: any) => {
    mutate(pagination);
  };

  console.log(requestFriends);
  const handleAcceptFriend = (acceptFriendId: string) => {
    acceptFriend(acceptFriendId);
  };

  useEffect(() => {
    if (inView) {
      handleGetData(requestFriendPagination);
    }
  }, [inView, requestFriendPagination]);
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
                  className="flex items-center gap-5 p-3 bg-white  rounded-xl"
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
                    <CustomButtonFriend
                      handleFn={(id: string) => handleAcceptFriend(id)}
                      title="Chấp nhận"
                      titleDisable="Đã chấp nhận"
                      isLoading={isAccpectLoading}
                      id={friend.id}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          {showLoadMore && (
            <div ref={ref}>
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestFriendPage;
