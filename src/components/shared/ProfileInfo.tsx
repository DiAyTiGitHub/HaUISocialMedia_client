import avatar from "@/assets/avatar.png";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

const ProfileInfo = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  return (
    <div className="bg-white h-fit p-5">
      <div className="flex justify-between items-center border-b border-black pb-5">
        <div className="flex items-center gap-2">
          <div className="profile-photo">
            <img src={avatar} alt="avartar" className="rounded-full" />
          </div>
          <div>
            <p className="text-base font-bold">
              {currentUser?.lastName} {currentUser?.firstName}
            </p>
            <p>
              <span>255</span> bạn bè
            </p>
          </div>
        </div>
        <Button onClick={() => navigate("/profile/edit")}>
          <Pencil size="sm" />
        </Button>
      </div>

      <div className="mt-5 flex flex-col ">
        <p className="h3-bold mb-5">Giới thiệu</p>
        <div className="flex flex-col gap-5 text-lg">
          <p>
            Giới tính: <span>Nam</span>
          </p>
          <p className="font-medium">
            Tên tài khoản:{" "}
            <span className="font-normal">{currentUser?.username}</span>
          </p>
          <p>
            Ngày tham gia: <span>11/04/22</span>
          </p>
          <p>
            Lớp: <span>KTPM</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
