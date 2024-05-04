import { Link, useLocation } from "react-router-dom";
import { sidebarAdmin } from "@/constant";
import LocalStorage from "@/services/LocalStorageService";
import { LogOut } from "lucide-react";
import { useStore } from "@/stores";
import { memo } from "react";
import { observer } from "mobx-react";
import LogoutButton from "../Auth/ui/LogoutButton";

function AdminSidebar() {
  const { pathname } = useLocation();
  const currentUser = LocalStorage.getLoggedInUser();
  const { authStore } = useStore();
  const { logout: handleLogoutV2 } = authStore;

  return (
    <div className="sticky top-0 bg-white h-screen basis-1/5 p-3">
      <div className="flex flex-col justify-between h-full">
        <div>
          <Link to="/admin" className="flex items-center gap-5 mb-3">
            <div className="profile-image">
              <img src="/logo-haui.png" />
            </div>
            <span className="text-body-bold">HauiSocial</span>
          </Link>

          <div>
            <div className="flex items-center gap-x-4 w-full py-4 hover:bg-blue-2 rounded-2xl">
              <div className="profile-photo">
                <img
                  src={currentUser?.avatar || "/person.jpg"}
                  alt="avartar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <p className="text-body-bold font-semibold">
                {currentUser?.lastName} {currentUser?.firstName}
              </p>
            </div>

            <div className="rounded-xl">
              {sidebarAdmin.map((link) => (
                <Link
                  key={link.route}
                  to={link.route}
                  className={`flex items-center h-12 cursor-pointer hover:bg-blue-2 relative ${
                    pathname === link.route && "sidebar-active"
                  }`}
                >
                  <img
                    src={link.icon}
                    alt="icon"
                    className="ml-4 w-6 h-6  relative"
                  />
                  <h3 className="ml-2 text-base-medium relative">
                    {link.label}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-5">
          <LogoutButton isAdminPage />
        </div>
      </div>
    </div>
  );
}

export default memo(observer(AdminSidebar));
