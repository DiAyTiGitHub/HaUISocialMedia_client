import PostCard from "./PostCard";
import { IPost } from "@/types";
import { Loader } from "lucide-react";

type PostListProps = {
  posts: IPost[];
  isLoading: boolean;
};
const PostList = ({ posts, isLoading }: PostListProps) => {
  if (isLoading) return <Loader />;
  return (
    <div className="">
      {posts?.map((post: IPost) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
