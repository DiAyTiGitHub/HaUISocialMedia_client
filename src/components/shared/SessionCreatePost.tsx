import { Input } from "../ui/input";
import CreatePost from "@/pages/PostForm";
import { useUserContext } from "@/context/authContext";
import { Link } from "react-router-dom";

const SessionCreatePost = () => {
  const { user } = useUserContext();
  return (
    <div className="bg-white p-5 rounded-lg">
      <div className="flex items-center gap-5 border-b ">
        <Link to="/profile/1" className="w-20 h-20">
          <img
            src={user.avatar}
            alt="avatar"
            className=" object-cover rounded-full"
          />
        </Link>
        <CreatePost>
          <Input
            type="text"
            placeholder="Bạn đăng nghĩ gì thế?"
            className="outline-none px-4 py-6  rounded-full bg-gray-10"
          />
        </CreatePost>
      </div>

      <div className="grid grid-cols-3 mt-4">
        <div className="flexCenter p-2 rounded-full hover:bg-gray-200 cursor-pointer">
          <p className="font-bold text-center">Video trực tiếp</p>
        </div>
        <div className="flexCenter p-2 rounded-full hover:bg-gray-200 cursor-pointer">
          <p className="font-bold text-center">Ảnh/Video</p>
        </div>
        <div className="flexCenter p-2 rounded-full hover:bg-gray-200 cursor-pointer">
          <p className="font-bold text-center">Cảm xúc/hoạt động</p>
        </div>
      </div>
    </div>
  );
};

export default SessionCreatePost;
