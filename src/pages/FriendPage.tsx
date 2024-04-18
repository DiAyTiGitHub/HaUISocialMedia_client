import Loader from "@/components/shared/Loader";
import SidebarFriendPage from "@/components/shared/SidebarFriendPage";
import FriendListSkeleton from "@/components/skeleton/FriendListSkeleton";
import { Button } from "@/components/ui/button";
import * as apiClient from "@/react-query/query-api";
import { IUser } from "@/types";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export type currentFriendsPagination = {
  pageIndex: number;
  pageSize: number;
  keyWord: string;
};

const FriendPage = () => {
  const { ref, inView } = useInView();
  const [showLoadMore, setShowLoadMore] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const [currentFriendPagination, setCurrentFriendPagination] =
    useState<currentFriendsPagination>({
      pageIndex: 0,
      pageSize: 10,
      keyWord: search,
    });

  const navigate = useNavigate();
  const [friends, setFriends] = useState<any[]>([]);

  const { mutate, isLoading } = useMutation(apiClient.getCurrentFriend, {
    onSuccess: async (data: any) => {
      if (data && data.length > 0) {
        setCurrentFriendPagination({
          pageSize: currentFriendPagination.pageSize,
          pageIndex: currentFriendPagination.pageIndex + 1,
          keyWord: search,
        });
        setFriends((prev) => [...prev, ...data]);
      } else {
        if (
          !data ||
          data.length === 0 ||
          data.length < currentFriendPagination.pageSize
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
  const handleSearch = () => {
    setCurrentFriendPagination((prev) => ({
      ...prev,
      keyWord: search,
      pageIndex: 0,
    }));
  };
  useEffect(() => {
    if (inView) {
      handleGetData(currentFriendPagination);
    }
  }, [inView, currentFriendPagination]);

  return (
    <div className="grid grid-cols-[1fr_3fr] mt-5">
      <SidebarFriendPage />
      <div className="flex flex-col gap-10 mx-5">
        <div className="flex-1 p-5">
          <div className="mb-5">
            <h3 className="h3-bold mb-5">Danh sách bạn bè</h3>
            <div className="flex items-center bg-white max-w-max  rounded-xl">
              <input
                type="text"
                placeholder="Tìm bạn bè..."
                className="input input-field"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleSearch}>
                <Search />
              </button>
            </div>
          </div>
          {isLoading && (
            <FriendListSkeleton length={12} styles="user-grid my-10" />
          )}

          {!isLoading && (
            <>
              {!friends || friends.length === 0 ? (
                <span>Không có bạn bè</span>
              ) : (
                <div className="user-grid my-10">
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

                        <Button className="bg-blue-600 hover:bg-blue-500">
                          Bạn bè
                        </Button>
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

export default FriendPage;
