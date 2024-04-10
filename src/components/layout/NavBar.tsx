import { GraduationCap, MessageCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";
import hauiLogo from "@/assets/logo-haui.png";

import UserDropdownMenu from "../shared/UserDropdownMenu";
import Notification from "../shared/Notification";
const NavBar = () => {
  return (
    <nav className="w-full bg-white py-3 sticky top-0 z-10">
      <div className="container flex-between ">
        <Link to="/" className="flex items-center gap-5">
          <div className="profile-image">
            <img src={hauiLogo} />
          </div>
          <h1 className="font-semibold text-xl">HAUI Social</h1>
        </Link>

        <div className="bg-light rounded-full search-padding flex items-center">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="outline-none  bg-transparent w-[30vw] ml-4 text-dark"
          />
          <button>
            <Search />
          </button>
        </div>

        <div className="flex items-center gap-10">
          <Link to="/leaderboard">
            <GraduationCap className="hover:text-primary" />
          </Link>
          <Link to="/chats">
            <MessageCircle className="hover:text-primary" />
          </Link>
          <Notification />
          <UserDropdownMenu />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
