import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { useMutation } from "react-query";
import * as apiClient from "@/react-query/query-api";
import { IPost } from "@/types";

export type newFeedPagination = {
  pageIndex: number;
  pageSize: number;
};

const PostList = () => {
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
  return (
    <>
      {isLoading || posts?.length === 0 ? (
        <span>"Đang tải ....</span>
      ) : (
        <div className="">
          {posts?.map((post: IPost) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};

export default PostList;
