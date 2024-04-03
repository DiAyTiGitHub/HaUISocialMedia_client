import RightSidebar from "@/components/layout/RightSidebar";
import Sidebar from "@/components/layout/Sidebar";
import PostList from "@/components/shared/PostList";
import SessionCreatePost from "@/components/shared/SessionCreatePost";

const HomePage = () => {
  return (
    <div className="w-full grid grid-cols-[18vw_auto_20vw] gap-x-8 relative">
      <Sidebar />

      <div className="">
        <SessionCreatePost />
        <PostList />
      </div>
      <RightSidebar />
    </div>
  );
};

export default HomePage;
