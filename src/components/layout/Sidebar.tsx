import { Link, useLocation } from "react-router-dom";
import { sidebarLink } from "@/constant";
import { useUserContext } from "@/context/authContext";
const Sidebar = () => {
  const { user } = useUserContext();
  const { pathname } = useLocation();
  return (
    <div className="lg:max-w-[300px] flex flex-col gap-10 h-full fixed  ">
      <Link to="/profile/1" className="flex items-center gap-2 mb-5">
        <img
          src={user.avatar}
          alt="avartar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <p className="text-xl font-semibold">{user.fullname}</p>
      </Link>
      {sidebarLink.map((link) => (
        <Link
          to={link.route}
          className={`flex items-center gap-5 hover:text-blue-600 hover:border-b pb-2 border-blue-600 ${
            pathname === link.route && "text-blue-600 border-b"
          }`}
        >
          <img src={link.icon} alt="icon" className="w-8 h-8" />
          <span className="text-lg">{link.label}</span>
        </Link>
      ))}
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
