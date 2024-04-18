import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import * as apiClient from "@/react-query/query-api";
import { IPost, IUser } from "@/types";
import { useInView } from "react-intersection-observer";
import Loader from "./Loader";
import FriendCard from "./FriendCard";
import FriendListSkeleton from "../skeleton/FriendListSkeleton";

type PagingType = {
  pageIndex: number;
  pageSize: number;
};
type Props = {
  profileId: string;
};

const FriendOfUser = ({ profileId }: Props) => {
  const [friends, setFriends] = useState<IUser[]>([]);
  const { ref, inView } = useInView();
  const [showLoadMore, setShowLoadMore] = useState<boolean>(true);
  const [paging, setPaging] = useState<PagingType>({
    pageIndex: 0,
    pageSize: 20,
  });

  const { mutate, isLoading } = useMutation(apiClient.getFriendOfUser, {
    onSuccess: async (data: any) => {
      if (data && data.length > 0) {
        setPaging((prev) => ({
          ...prev,
          pageIndex: prev.pageIndex + 1,
        }));
        setFriends((prev) => [...prev, ...data]);
        if (data.length < paging.pageSize) setShowLoadMore(false);
      } else {
        if (!data || data.length === 0) setShowLoadMore(false);
      }
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });

  const handleGetData = () => {
    mutate({
      paging: paging,
      userId: profileId as string,
    });
  };
  useEffect(() => {
    if (inView) {
      handleGetData();
    }
  }, [inView, paging]);

  return (
    <div className="bg-white p-3 rounded-md">
      {isLoading && (
        <FriendListSkeleton length={4} styles="grid grid-cols-2 gap-3" />
      )}
      {!isLoading && (
        <>
          {!friends || friends.length === 0 ? (
            <span>Chưa có bạn bè nào</span>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {friends.map((friends) => (
                <FriendCard key={friends.id} friend={friends} />
              ))}
            </div>
          )}{" "}
        </>
      )}
      {showLoadMore && (
        <div ref={ref}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default FriendOfUser;
