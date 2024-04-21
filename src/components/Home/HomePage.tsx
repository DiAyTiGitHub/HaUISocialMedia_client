import RightSidebar from "@/components/layout/RightSidebar";
import Sidebar from "@/components/layout/Sidebar";
import PostList from "@/components/Post/PostList";
import SessionCreatePost from "@/components/Post/SessionCreatePost";
import { useState } from "react";

import { SearchObjectType } from "@/types";
import { Loader } from "lucide-react";
import useGetData from "@/lib";
import { useStore } from "@/stores";

export type newFeedPagination = {
  pageIndex: number;
  pageSize: number;
};
const HomePage = () => {
  const { postStore } = useStore();
  const { getNewFeed } = postStore;

  const [paging, setPaging] = useState<SearchObjectType>({
    pageIndex: 0,
    pageSize: 20,
  });

  const {
    ref,
    res: posts,
    isLoading,
    showLoadMore,
    isError,
  } = useGetData({
    getRequest: getNewFeed,
    paging: paging,
    setPaging: setPaging,
  });

  return (
    <div className="w-full grid grid-cols-[1fr_2fr_1fr] gap-x-8 relative mt-5">
      <Sidebar />
      <div className="">
        <SessionCreatePost />
        {!posts ? (
          <p className="mt-10 text-center">Không có bài viết nào </p>
        ) : (
          <>
            <PostList posts={posts} isLoading={isLoading} isError={isError} />
          </>
        )}
        {showLoadMore && (
          <div ref={ref}>
            <Loader />
          </div>
        )}
      </div>
      <RightSidebar />
    </div>
  );
};

export default HomePage;
