import { Contact, Handshake, Notebook } from "lucide-react";
import { Link } from "react-router-dom";
import avatar from "@/assets/avatar.png";
const Sidebar = () => {
  return (
    <div className="lg:min-w-[300px] flex flex-col gap-10 h-full fixed  ">
      <div className="flex items-center gap-2 mb-5">
        <img
          src={avatar}
          alt="avartar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <p className="text-xl font-semibold">Nguyen Thanh Thuan</p>
      </div>
      <Link
        to="/"
        className="flex items-center gap-5 hover:text-blue-600 hover:border-b pb-2 border-blue-600"
      >
        <Contact className="text-blue-600" />
        <span className="text-xl">Bạn bè</span>
      </Link>
      <Link
        to="/"
        className="flex items-center gap-5 hover:text-blue-600 hover:border-b pb-2 border-blue-600"
      >
        <Notebook className="text-blue-600" />
        <span className="text-xl">Những bài đăng cũ</span>
      </Link>
      <Link
        to="/"
        className="flex items-center gap-5 hover:text-blue-600 hover:border-b pb-2 border-blue-600"
      >
        <Handshake className="text-blue-600" />
        <span className="text-xl">Nhóm</span>
      </Link>
    </div>
  );
};

export default Sidebar;
