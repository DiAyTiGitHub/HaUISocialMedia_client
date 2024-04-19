import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LocalStorage from "@/services/LocalStorageService";
import { memo } from "react";
import { observer } from "mobx-react";
import { useStore } from "@/stores";

const UserDropdownMenu = () => {
  const navigate = useNavigate();
  const currentUser = LocalStorage.getLoggedInUser();

  //new code base for storebase
  const { authStore } = useStore();
  const { logout: handleLogoutV2 } = authStore;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img
          src={currentUser?.avatar || "/person.jpg"}
          alt="user-image"
          className="w-10 h-10 rounded-full object-cover"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative right-[2vw] min-w-[300px] flex flex-col gap-3 p-3 border-none shadow-lg max-z-index">
        <DropdownMenuItem className="hover:bg-blue-2 py-2 rounded-xl">
          <button
            className="flex gap-2 items-center"
            onClick={() => navigate("/profile/edit")}
          >
            <Pencil /> Chỉnh sửa thông tin
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-blue-2 py-2 rouned-lg">
          <button className="flex items-center gap-2" onClick={handleLogoutV2}>
            <LogOut /> Đăng xuất
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(observer(UserDropdownMenu));
