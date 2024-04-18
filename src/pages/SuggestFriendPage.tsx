import CustomButtonFriend from "@/components/shared/CustomButtonFriend";
import SidebarFriendPage from "@/components/shared/SidebarFriendPage";
import * as apiClient from "@/react-query/query-api";
import { useSendRequestFriend } from "@/react-query/relationship";
import { IUser } from "@/types";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useInView } from "react-intersection-observer";
import Loader from "@/components/shared/Loader";
import { Link } from "react-router-dom";
import FriendListSkeleton from "@/components/skeleton/FriendListSkeleton";
export type suggestFriendsPagination = {
  pageIndex: number;
  pageSize: number;
};

const SuggestFriendPage = () => {
  const { ref, inView } = useInView();
  const { mutate: sendRequest, isLoading: isSending } = useSendRequestFriend();
  const [suggestFriendPagination, setSuggestFriendPagination] =
    useState<suggestFriendsPagination>({
      pageIndex: 0,
      pageSize: 5,
    });
  const [suggestFriends, setSuggestFriends] = useState<IUser[]>([]);
  const [showLoadMore, setShowLoadMore] = useState<boolean>(true);

  const { mutate, isLoading } = useMutation(apiClient.getSuggestFriends, {
    onSuccess: async (data: any) => {
      if (data && data.length > 0) {
        setSuggestFriendPagination({
          pageSize: suggestFriendPagination.pageSize,
          pageIndex: suggestFriendPagination.pageIndex + 1,
        });
        setSuggestFriends((prev) => [...prev, ...data]);
      } else {
        if (
          !data ||
          data.length === 0 ||
          data.length < suggestFriendPagination.pageSize
        )
          setShowLoadMore(false);
      }
    },
    onError: (error: Error) => {
      console.log(error);
      setShowLoadMore(false);
    },
  });

  const handleGetData = (pagination: any) => {
    mutate(pagination);
  };

  const handleSendRequestFriend = (friendId: string) => {
    sendRequest(friendId);
  };

  useEffect(() => {
    if (inView) {
      handleGetData(suggestFriendPagination);
    }
  }, [inView, suggestFriendPagination]);
  console.log(1);
  return (
    <div className="grid grid-cols-[1fr_3fr] mt-5">
      <SidebarFriendPage />
      <div className="flex flex-col gap-10 mx-5">
        <div className="flex-1 p-5">
          <div className="mb-5">
            <h3 className="h3-bold mb-5">Danh sách gợi ý</h3>
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

          {isLoading && (
            <FriendListSkeleton
              length={6}
              styles="grid grid-cols-2 gap-5 my-10"
            />
          )}

          {!isLoading && (
            <div className=" grid grid-cols-2 gap-5 my-10">
              {!suggestFriends || suggestFriends.length === 0 ? (
                <span>Không có bạn bè gợi ý</span>
              ) : (
                suggestFriends.map((friend: IUser) => (
                  <div
                    key={friend.id}
                    className="flex items-center gap-5 p-3 bg-blue-2 rounded-xl"
                  >
                    <Link to={`/profile/${friend.id}`}></Link>
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

                      <CustomButtonFriend
                        handleFn={(id: string) => handleSendRequestFriend(id)}
                        title="Thêm bạn bè"
                        titleDisable="Đã gửi lời mời"
                        isLoading={isSending}
                        id={friend.id}
                      />
                    </div>
                  </div>
                ))
              )}
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

export default SuggestFriendPage;
