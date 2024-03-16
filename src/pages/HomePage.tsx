import PostList from "@/components/shared/PostList";
import SessionCreatePost from "@/components/shared/SessionCreatePost";

const HomePage = () => {
  return (
    <div className="flex flex-col flex-1  gap-10 mx-5 lg:ml-[320px]">
      <SessionCreatePost />
      <PostList />
    </div>
  );
};

export default HomePage;
