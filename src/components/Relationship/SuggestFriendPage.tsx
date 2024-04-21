import CustomButtonFriend from "./CustomButtonFriend";
import { IUser, SearchObjectType } from "@/types";
import { Search } from "lucide-react";
import { useState } from "react";
import Loader from "@/components/shared/Loader";
import { Link } from "react-router-dom";
import FriendListSkeleton from "@/components/skeleton/FriendListSkeleton";
import useGetData from "@/lib";
import { useStore } from "@/stores";
import SidebarFriendPage from "./SidebarFriendPage";

const SuggestFriendPage = () => {
  const [paging, setPaging] = useState<SearchObjectType>({
    pageIndex: 1,
    pageSize: 20,
  });
  const { userStore, relationshipStore } = useStore();
  const { getSuggestFriend } = userStore;
  const { addFriend } = relationshipStore;
  const {
    ref,
    res: suggestFriends,
    isLoading,
    showLoadMore,
  } = useGetData({
    getRequest: getSuggestFriend,
    paging: paging,
    setPaging: setPaging,
  });

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
                        handleFn={addFriend}
                        title="Thêm bạn bè"
                        message="Đã gửi lời mời"
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
