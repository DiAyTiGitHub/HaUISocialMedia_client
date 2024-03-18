import { MessageCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";
import hauiLogo from "@/assets/logo-haui.png";

import UserDropdownMenu from "../shared/UserDropdownMenu";
import Notification from "../shared/Notification";
const NavBar = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-padd-container flex items-center justify-between py-5">
        <div className="flex gap-10">
          <Link to="/" className="flex items-center gap-5">
            <img src={hauiLogo} />
            <h1 className="font-semibold text-xl">HAUI Social</h1>
          </Link>
          <div className="flex items-center border  rounded-full bg-slate-100 px-3 py-2">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="outline-none lg:min-w-[300px] bg-transparent"
            />
            <button>
              <Search />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <Link to="/chats">
            <MessageCircle className="hover:text-blue-500" />
          </Link>
          <Notification />
          <UserDropdownMenu />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
