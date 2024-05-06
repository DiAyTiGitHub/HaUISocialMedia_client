import { GraduationCap, MessageCircle, Search } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import hauiLogo from "@/assets/logo-haui.png";

import UserDropdownMenu from "../shared/UserDropdownMenu";
import Notification from "../Notification/Notification";
import { navbarLink } from "@/constant";
import { ChangeEvent, memo, useState } from "react";
import { observer } from "mobx-react";

const NavBar = () => {
  const [search, setSearch] = useState("");
  const { pathname } = useLocation();
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleNavigateSearchPage = () => {
    window.location.href = `/search?name=${search}`;
  };
  return (
    <nav className="w-full bg-white py-3 px-5 sticky top-0 z-10 shadow-lg max-h-[88px] max-z-index">
      <div className="flex-between ">
        <div className="flex gap-3">
          <Link to="/" className="flex items-center gap-5">
            <div className="profile-image">
              <img src={hauiLogo} />
            </div>
          </Link>

          <div className="flex gap-3 bg-light rounded-full px-4 py-2 justify-between items-center">
            <input
              type="text"
              placeholder="Tìm kiếm trên Haui Social..."
              className="outline-none  bg-transparent  ml-4 text-dark"
              onChange={handleSearchChange}
            />
            <button
              className="max-w-max disabled:cursor-text"
              onClick={handleNavigateSearchPage}
              disabled={search.length === 0}
            >
              <Search />
            </button>
          </div>
        </div>

        <div className="flex gap-10">
          {navbarLink.map((link) => (
            <Link
              key={link.route}
              to={link.route}
              className={`flex items-center justify-center h-16 w-20 cursor-pointer relative ${
                pathname === link.route && "navbar-active"
              }`}
            >
              <img src={link.icon} alt="icon" className="w-8 h-8 relative" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-10">
          <Link to="/leaderboard" className="bg-light p-3 rounded-full">
            <GraduationCap className="hover:text-primary" />
          </Link>

          <Link to="/messenger-v2" className="bg-light p-3 rounded-full">
            <MessageCircle className="hover:text-primary" />
          </Link>
          <div className="bg-light p-3 rounded-full flex z-10 ">
            <Notification />
          </div>
          <UserDropdownMenu />
        </div>
      </div>
    </nav>
  );
};

export default memo(observer(NavBar));
