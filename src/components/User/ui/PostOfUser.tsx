import PostList, { LoadingPost } from "@/components/Post/PostList";
import Loader from "@/components/shared/Loader";
import NoData from "@/components/shared/NoData";
import { useGetDataPostByUserId } from "@/lib";
import LocalStorageService from "@/services/LocalStorageService";
import { useStore } from "@/stores";
import { SearchObjectType } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

const PostOfUser = () => {
  const { profileId } = useParams();
  const currentUser = LocalStorageService.getLoggedInUser();

  const { postStore } = useStore();

  const [paging, setPaging] = useState<SearchObjectType>({
    pageIndex: 0,
    pageSize: 20,
    mileStoneId: "",
  });

  const { getPostOfUser } = postStore;
  const {
    ref,
    res: posts,
    isLoading,
    showLoadMore,
    endOfListRef,
  } = useGetDataPostByUserId({
    getRequest: getPostOfUser,
    paging: paging,
    setPaging: setPaging,
    userId: profileId,
  });

  return (
    <>
      {isLoading ? (
        <LoadingPost />
      ) : (
        <>
          <PostList
            posts={posts}
            isLoading={isLoading}
            endOfListRef={endOfListRef}
            lastId={paging.mileStoneId}
          />
          {!posts ||
            (posts.length === 0 && (
              <div className="bg-white w-full rounded-md h-full py-10 mt-4">
                {profileId === currentUser?.id ? (
                  <NoData title="Bạn chưa có bài viết nào, hãy kết nối với bạn bè để cùng chia sẻ những khoản khắc !!!" />
                ) : (
                  <NoData title="Chưa có bài viết nào" />
                )}
              </div>
            ))}
        </>
      )}
      {showLoadMore && (
        <div ref={ref} className="-mt-4">
          <Loader />
        </div>
      )}
    </>
  );
};

export default PostOfUser;
