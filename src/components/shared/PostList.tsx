import PostCard from "./PostCard";
import { IPost } from "@/types";
import PostSkeleton from "../skeleton/PostSkeleton";
import { isError } from "react-query";

type PostListProps = {
  posts: IPost[];
  isLoading?: boolean;
  isError?: boolean;
};

const LoadingPost = () => {
  return (
    <div>
      {"1234567".split("").map((i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  );
};

const PostList = ({ posts, isLoading, isError }: PostListProps) => {
  if (isLoading) return <LoadingPost />;
  if (isError)
    return <span className="text-red-500 text-center">Có lỗi xảy ra</span>;
  return (
    <div className="">
      {posts?.map((post: IPost) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
