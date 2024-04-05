import { sidebarFriendPage } from "@/constant";
import { Link, useLocation } from "react-router-dom";

const SidebarFriendPage = () => {
  const { pathname } = useLocation();
  return (
    <div className="sticky h-max top-[5.4rem] ">
      <Link
        to={`/`}
        className="flex items-center gap-x-4 w-full p-4 bg-white rounded-2xl"
      >
        <p className="text-sm font-semibold">Trang chủ</p>
      </Link>

      <div className="mt-4 bg-white rounded-xl">
        {sidebarFriendPage.map((link) => (
          <Link
            key={link.route}
            to={link.route}
            className={`flex items-center h-16 cursor-pointer relative ${
              pathname === link.route && "sidebar-active"
            }`}
          >
            <img src={link.icon} alt="icon" className="w-8 h-8 ml-8 relative" />
            <h3 className="ml-6 text-base relative">{link.label}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarFriendPage;
