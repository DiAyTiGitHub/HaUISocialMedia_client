import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { currentUser } from "@/mockData";
const UserDropdownMenu = () => {
  const user = currentUser;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img
          src={user.avatar}
          alt="user-image"
          className="w-10 h-10 rounded-full object-cover"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative right-[45%] min-w-[300px] flex flex-col gap-5 p-3">
        <DropdownMenuItem>
          <button
            className="flex gap-2 items-center"
            onClick={() => navigate("/profile/edit")}
          >
            <Pencil /> Chỉnh sửa thông tin
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button className="flex items-center gap-2" onClick={handleLogout}>
            <LogOut /> Đăng xuất
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
