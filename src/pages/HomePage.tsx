import RightSidebar from "@/components/layout/RightSidebar";
import Sidebar from "@/components/layout/Sidebar";
import PostList from "@/components/shared/PostList";
import SessionCreatePost from "@/components/shared/SessionCreatePost";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import * as apiClient from "@/react-query/query-api";
import { IPost } from "@/types";
import { Loader } from "lucide-react";
import { useInView } from "react-intersection-observer";

export type newFeedPagination = {
  pageIndex: number;
  pageSize: number;
};
const HomePage = () => {
  const { ref, inView } = useInView();
  const [showLoadMore, setShowLoadMore] = useState<boolean>(true);
  const [newFeedPagination, setNewFeedPagination] = useState<newFeedPagination>(
    {
      pageIndex: 1,
      pageSize: 10,
    }
  );
  const [posts, setPosts] = useState<IPost[]>([]);

  const { mutate, isLoading } = useMutation(apiClient.getNewFeed, {
    onSuccess: async (data: any) => {
      if (data && data.length > 0) {
        setNewFeedPagination((prev) => ({
          ...prev,
          pageIndex: prev.pageIndex + 1,
        }));
        setPosts((prev) => [...prev, ...data]);
      } else {
        if (
          !data ||
          data.length === 0 ||
          data.length < newFeedPagination.pageSize
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

  useEffect(() => {
    if (inView) {
      handleGetData(newFeedPagination);
    }
  }, [inView, newFeedPagination]);
  return (
    <div className="w-full grid grid-cols-[18vw_auto_20vw] gap-x-8 relative">
      <Sidebar />
      <div className="">
        <SessionCreatePost />
        {!posts ? (
          <p className="mt-10 text-center">Không có bài viết nào </p>
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
      <RightSidebar />
    </div>
  );
};

export default HomePage;
