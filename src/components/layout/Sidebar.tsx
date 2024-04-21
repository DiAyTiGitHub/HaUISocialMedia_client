import { Link, useLocation } from "react-router-dom";
import { sidebarLink } from "@/constant";
import LocalStorage from "@/services/LocalStorageService";
const Sidebar = () => {
  const { pathname } = useLocation();
  const currentUser = LocalStorage.getLoggedInUser();
  return (
    <div className="sticky h-max top-[5.4rem] ">
      <Link
        to={`/profile/${currentUser?.id}`}
        className="flex items-center gap-x-4 w-full p-4 hover:bg-blue-2 rounded-2xl"
      >
        <div className="profile-photo">
          <img
            src={currentUser?.avatar || "/person.jpg"}
            alt="avartar"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <p className="text-body-bold font-semibold">
          {currentUser?.lastName} {currentUser?.firstName}
        </p>
      </Link>

      <div className="rounded-xl">
        {sidebarLink.map((link) => (
          <Link
            key={link.route}
            to={link.route}
            className={`flex items-center h-16 cursor-pointer hover:bg-blue-2 relative ${
              pathname === link.route && "sidebar-active"
            }`}
          >
            <img src={link.icon} alt="icon" className="w-8 h-8 ml-8 relative" />
            <h3 className="ml-6 text-body-medium relative">{link.label}</h3>
          </Link>
        ))}
        <div className="mt-2 border-b-2 border-grey-3"></div>
      </div>
    </div>
  );
};

export default Sidebar;
