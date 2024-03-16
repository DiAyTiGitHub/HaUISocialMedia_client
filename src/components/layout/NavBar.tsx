import { Bell, MessageCircle, Search, UserCheckIcon } from "lucide-react";
import { Link } from "react-router-dom";
import hauiLogo from "@/assets/logo-haui.png";
const NavBar = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-padd-container flex items-center justify-between py-5">
        <div className="flex gap-10">
          <Link to="/" className="flex items-center gap-5">
            <img src={hauiLogo} />
            <h1 className="font-semibold text-2xl">HAUI Social</h1>
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
          <Link to="/">
            <Bell />
          </Link>
          <Link to="/">
            <MessageCircle />
          </Link>
          <div>
            <UserCheckIcon />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
