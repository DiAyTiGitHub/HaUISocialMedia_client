import CustomButtonFriend from "./CustomButtonFriend";
import Loader from "@/components/shared/Loader";

import FriendListSkeleton from "@/components/skeleton/FriendListSkeleton";
import useGetData from "@/lib";
import { useStore } from "@/stores";
import { SearchObjectType } from "@/types";
import { Search } from "lucide-react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import SidebarFriendPage from "./SidebarFriendPage";

export type requestFriendsPagination = {
  pageIndex: number;
  pageSize: number;
};

const RequestFriendPage = () => {
  const navigate = useNavigate();
  const { relationshipStore } = useStore();
  const { getPendingFriendRequests, acceptFriend, unAcceptFriend } =
    relationshipStore;
  const [paging, setPaging] = useState<SearchObjectType>({
    pageIndex: 1,
    pageSize: 20,
  });

  const {
    ref,
    res: requestFriends,
    isLoading,
    showLoadMore,
  } = useGetData({
    getRequest: getPendingFriendRequests,
    paging: paging,
    setPaging: setPaging,
  });
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
          {isLoading && (
            <FriendListSkeleton length={12} styles="user-grid my-10" />
          )}
          {!isLoading && (
            <>
              {!requestFriends || requestFriends.length === 0 ? (
                <span>Không có lời mời</span>
              ) : (
                <div className="grid grid-cols-2 gap-5 my-10">
                  {requestFriends.map((friend: any) => (
                    <div
                      key={friend.id}
                      className="flex items-center gap-5 p-3 bg-white  rounded-xl cursor-pointer"
                      onClick={() =>
                        navigate(`/profile/${friend.requestSender.id}`)
                      }
                    >
                      <div className="flex justify-between flex-1">
                        <div className="flex items-center gap-3">
                          <img
                            src={friend.avatar || "/person.jpg"}
                            alt="avatar"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <p className="font-medium">
                            {friend.requestSender.lastName}{" "}
                            {friend.requestSender.firstName}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <CustomButtonFriend
                            isSecondary
                            handleFn={unAcceptFriend}
                            title="Từ chối"
                            message="Đã từ chối"
                            id={friend.id}
                          />
                          <CustomButtonFriend
                            handleFn={acceptFriend}
                            title="Chấp nhật"
                            message="Đã chấp nhận"
                            id={friend.id}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
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
