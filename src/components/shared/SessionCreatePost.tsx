import avatar from "@/assets/avatar.png";
import { Input } from "../ui/input";
import CreatePost from "@/pages/CreatePost";

const SessionCreatePost = () => {
  return (
    <div className="bg-white p-5">
      <div className="flex items-center gap-5 border-b ">
        <img
          src={avatar}
          alt="avatar"
          className="w-20 h-20 object-cover rounded-full"
        />
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
