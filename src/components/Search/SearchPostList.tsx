import useGetData, { useGetDataNewFeed } from "@/lib";
import { useStore } from "@/stores";
import { SearchObjectType } from "@/types";
import { useState } from "react";
import PostList from "../Post/PostList";
import Loader from "../shared/Loader";
import { useSearchParams } from "react-router-dom";
import NoData from "../shared/NoData";

const SearchPostList = () => {
  const [searchParams] = useSearchParams();
  const { loadingTotalStore } = useStore();
  const { pagingPostByKeyword } = loadingTotalStore;

  const [paging, setPaging] = useState<SearchObjectType>({
    pageIndex: 1,
    pageSize: 20,
    mileStoneId: "",
    keyWord: searchParams.get("name") as string,
  });

  const {
    ref,
    res: posts,
    isLoading,
    showLoadMore,
    isError,
  } = useGetDataNewFeed({
    getRequest: pagingPostByKeyword,
    paging: paging,
    setPaging: setPaging,
  });
  console.log(posts);
  return (
    <div>
      {!posts || posts.length === 0 ? (
        <NoData title="Không có kết quả tìm kiếm bài viết" />
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
