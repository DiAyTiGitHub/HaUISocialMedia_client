import NavBar from "@/components/layout/NavBar";
import PostList from "@/components/shared/PostList";
import ProfileInfo from "@/components/shared/ProfileInfo";
import SessionCreatePost from "@/components/shared/SessionCreatePost";

const Profile = () => {
  return (
    <div className="w-full grid grid-cols-[25vw_auto_20vw] gap-x-8 relative">
      <ProfileInfo />

      <div className="flex flex-col gap-10">
        <SessionCreatePost />
        <PostList />
      </div>
    </div>
  );
};

export default Profile;
