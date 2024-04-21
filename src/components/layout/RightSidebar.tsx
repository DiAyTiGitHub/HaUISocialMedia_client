import { useMutation } from "react-query";
import FriendResquest from "../Relationship/FriendResquest";
import { useEffect, useState } from "react";
import * as apiClient from "@/react-query/query-api";
import { useInView } from "react-intersection-observer";
import { Loader } from "lucide-react";
import { IUser, SearchObjectType } from "@/types";
import { Link } from "react-router-dom";

import FriendListSkeleton from "../skeleton/FriendListSkeleton";
import useGetData from "@/lib";
import { useStore } from "@/stores";

const RightSidebar = () => {
  const { relationshipStore } = useStore();
  const { getCurrentFriend, acceptFriend, unAcceptFriend } = relationshipStore;
  const [paging, setPaging] = useState<SearchObjectType>({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    ref,
    res: friends,
    isLoading,
    showLoadMore,
  } = useGetData({
    getRequest: getCurrentFriend,
    paging: paging,
    setPaging: setPaging,
  });

  return (
    <div className="sticky top-[6rem] h-max bottom-0 ">
      <FriendResquest />
      <div className="mt-3">
        <h2 className="text-body-medium mb-2">Bạn bè</h2>

        {isLoading ? (
          <FriendListSkeleton length={5} styles="flex flex-col gap-2" />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
