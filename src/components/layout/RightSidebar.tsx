import { useMutation } from "react-query";
import FriendResquest from "../shared/FriendResquest";
import { useEffect, useState } from "react";
import * as apiClient from "@/react-query/query-api";
import { useInView } from "react-intersection-observer";
import { Loader } from "lucide-react";
import { IUser } from "@/types";
import { Link } from "react-router-dom";
const RightSidebar = () => {
  const { ref, inView } = useInView();
  const [showLoadMore, setShowLoadMore] = useState<boolean>(true);
  const [currentFriendPagination, setCurrentFriendPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [friends, setFriends] = useState<IUser[]>([]);

  const mutation = useMutation(apiClient.getCurrentFriend, {
    onSuccess: async (data: any) => {
      if (data && data.length > 0) {
        setCurrentFriendPagination({
          pageSize: currentFriendPagination.pageSize,
          pageIndex: currentFriendPagination.pageIndex + 1,
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
    },
  });
  const handleGetData = (pagination: any) => {
    mutation.mutate(pagination);
  };
  useEffect(() => {
    if (inView) {
      handleGetData(currentFriendPagination);
    }
  }, [inView, currentFriendPagination]);
  return (
    <div className="sticky top-[6rem] h-max bottom-0 ">
      <FriendResquest />
      <div className="mt-3">
        <h2 className="text-body-medium mb-2">Bạn bè</h2>
        {!friends || friends.length === 0 ? (
          <span>Chưa có bạn bè nào</span>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              {friends.map((friend: IUser) => (
                <Link
                  to={`/profile/${friend.id}`}
                  className="flex items-center gap-2 bg-blue-2 p-2 rounded-lg"
                  key={friend.id}
                >
                  <img
                    src={friend.avatar || "/person.jpg"}
                    alt="profile-img"
                    className="profilePhoto"
                  />
                  <p>
                    {friend.lastName} {friend.firstName}
                  </p>
                </Link>
              ))}
            </div>
          </>
        )}
        {showLoadMore && (
          <div ref={ref}>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
