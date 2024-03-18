import RightSidebar from "@/components/layout/RightSidebar";
import Sidebar from "@/components/layout/Sidebar";
import PostList from "@/components/shared/PostList";
import SessionCreatePost from "@/components/shared/SessionCreatePost";

const HomePage = () => {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col flex-1  gap-10 mx-5 lg:ml-[26%]">
        <SessionCreatePost />
        <PostList />
      </div>
      <RightSidebar />
    </>
  );
};

export default HomePage;
