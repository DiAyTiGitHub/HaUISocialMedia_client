import PostCard from "./PostCard";

const PostList = () => {
  return (
    <ul className="flex flex-col flex-1 gap-9 w-full pb-10">
      <li>
        <PostCard />
      </li>
      <li>
        <PostCard />
      </li>
    </ul>
  );
};

export default PostList;
