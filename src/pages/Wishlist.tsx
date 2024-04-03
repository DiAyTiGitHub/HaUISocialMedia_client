import Sidebar from "@/components/layout/Sidebar";
import PostList from "@/components/shared/PostList";
import SessionCreatePost from "@/components/shared/SessionCreatePost";

const Wishlist = () => {
  return (
    <div className="w-full grid grid-cols-[25vw_auto_15vw] gap-x-8 relative">
      <Sidebar />
      <div className="flex flex-col flex-1   mx-5 max-w-3xl">
        <SessionCreatePost />
        <div className="flex flex-col flex-1  p-5">
          <div className="flex flex-col">
            <h3 className="h3-bold">Những bài đăng đã thích</h3>
            <PostList />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Wishlist;
