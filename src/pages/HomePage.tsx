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
  const [newFeedPagination, setNewFeedPagination] = useState<newFeedPagination>(
    {
      pageIndex: 0,
      pageSize: 10,
    }
  );
  const [posts, setPosts] = useState<IPost[]>();

  const { mutate, isLoading } = useMutation(apiClient.getNewFeed, {
    onSuccess: async (data: any) => {
      setPosts(data);
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });
  useEffect(() => {
    mutate(newFeedPagination);
  }, [newFeedPagination]);
  console.log(posts);
  useEffect(() => {
    if (inView) {
      setNewFeedPagination((prev) => ({
        ...prev,
        pageSize: prev.pageSize + 10,
      }));
    }
  }, [inView]);
  if (!posts) return;
  return (
    <div className="w-full grid grid-cols-[18vw_auto_20vw] gap-x-8 relative">
      <Sidebar />

      <div className="">
        <SessionCreatePost />
        <PostList posts={posts} isLoading={isLoading} />
        {posts.length > 0 && posts.length <= 5 ? (
          <div ref={ref}>
            <Loader />
          </div>
        ) : (
          <span className="flex justify-center mt-10">
            Không có bài viết nào
          </span>
        )}
      </div>
      <RightSidebar />
    </div>
  );
};

export default HomePage;
