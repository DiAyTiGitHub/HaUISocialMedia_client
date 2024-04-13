import ProfileInfo from "@/components/shared/ProfileInfo";
import SessionCreatePost from "@/components/shared/SessionCreatePost";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useMutation } from "react-query";
import * as apiClient from "@/react-query/query-api";
import { newFeedPagination } from "./HomePage";
import { IPost } from "@/types";
import { useParams } from "react-router-dom";
import Loader from "@/components/shared/Loader";
import PostList from "@/components/shared/PostList";

const Profile = () => {
  const { ref, inView } = useInView();
  const [showLoadMore, setShowLoadMore] = useState<boolean>(true);
  const { profileId } = useParams();
  const [newFeedPagination, setNewFeedPagination] = useState<newFeedPagination>(
    {
      pageIndex: 0,
      pageSize: 10,
    }
  );
  const [posts, setPosts] = useState<IPost[]>([]);

  const { mutate, isLoading } = useMutation(apiClient.getPostOfUser, {
    onSuccess: async (data: any) => {
      if (data && data.length > 0) {
        setNewFeedPagination((prev) => ({
          ...prev,
          pageIndex: prev.pageIndex + 1,
        }));
        setPosts((prev) => [...prev, ...data]);
        if (data.length < newFeedPagination.pageSize) setShowLoadMore(false);
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
      newFeedPagination: newFeedPagination,
      userId: profileId as string,
    });
  };
  useEffect(() => {
    if (inView) {
      handleGetData();
    }
  }, [inView, newFeedPagination]);

  return (
    <div className="w-full grid grid-cols-[25vw_auto_20vw] gap-x-8 relative">
      <ProfileInfo />

      <div className="flex flex-col gap-10">
        <SessionCreatePost />
        {!posts || posts.length === 0 ? (
          <p>Chưa có bài viết nào</p>
        ) : (
          <>
            <PostList posts={posts} isLoading={isLoading} />
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

export default Profile;
