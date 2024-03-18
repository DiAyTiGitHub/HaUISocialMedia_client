import NavBar from "@/components/layout/NavBar";
import PostList from "@/components/shared/PostList";
import ProfileInfo from "@/components/shared/ProfileInfo";
import SessionCreatePost from "@/components/shared/SessionCreatePost";

const Profile = () => {
  return (
    <>
      <NavBar />
      <div className="max-padd-container">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] mt-10 gap-10">
          <ProfileInfo />

          <div className="flex flex-col gap-10">
            <SessionCreatePost />
            <PostList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
