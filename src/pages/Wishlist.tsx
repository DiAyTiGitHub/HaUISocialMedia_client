import Sidebar from "@/components/layout/Sidebar";
import PostList from "@/components/shared/PostList";
import SessionCreatePost from "@/components/shared/SessionCreatePost";

const Wishlist = () => {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col flex-1  gap-10 mx-5 lg:ml-[26%] max-w-3xl">
        <SessionCreatePost />
        <div className="flex flex-col flex-1  p-5">
          <div className="flex flex-col gap-10">
            <h3 className="h3-bold">Những bài đăng đã thích</h3>
            <PostList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
