import { useGetDataNewFeed } from "@/lib";
import { useStore } from "@/stores";
import { SearchObjectType } from "@/types";
import React, { useState } from "react";
import PostList from "../Post/PostList";
import Loader from "../shared/Loader";

const SearchPostList = () => {
  const { postStore } = useStore();
  const { getNewFeed } = postStore;

  const [paging, setPaging] = useState<SearchObjectType>({
    pageIndex: 0,
    pageSize: 20,
    mileStoneId: "",
  });

  const {
    ref,
    res: posts,
    isLoading,
    showLoadMore,
    isError,
  } = useGetDataNewFeed({
    getRequest: getNewFeed,
    paging: paging,
    setPaging: setPaging,
  });
  return (
    <div>
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
  );
};

export default SearchPostList;
