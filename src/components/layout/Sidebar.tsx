import { Link, useLocation } from "react-router-dom";
import { sidebarLink } from "@/constant";
import { useAuth } from "@/context/AuthProvider";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { currentUser } = useAuth();
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

{
  /* <Link to="/profile/1" className="flex items-center gap-2 mb-5">
        <img
          src={avatar}
          alt="avartar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <p className="text-xl font-semibold">Nguyen Thanh Thuan</p>
      </Link>
      <Link
        to="/"
        className="flex items-center gap-5 hover:text-blue-600 hover:border-b pb-2 border-blue-600"
      >
        <Contact className="text-blue-600" />
        <span className="text-xl"></span>
      </Link>
      <Link
        to="/"
        className="flex items-center gap-5 hover:text-blue-600 hover:border-b pb-2 border-blue-600"
      >
        <Notebook className="text-blue-600" />
        <span className="text-xl"></span>
      </Link>
      <Link
        to="/"
        className="flex items-center gap-5 hover:text-blue-600 hover:border-b pb-2 border-blue-600"
      >
        <Handshake className="text-blue-600" />
        <span className="text-xl">Nhóm</span>
      </Link> */
}
