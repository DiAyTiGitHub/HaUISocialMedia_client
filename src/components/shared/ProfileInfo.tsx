import avatar from "@/assets/avatar.png";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileInfo = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white h-fit p-5">
      <div className="flex justify-between items-center border-b border-black pb-5">
        <div className="flex items-center gap-2">
          <img
            src={avatar}
            alt="avartar"
            className="w-12 lg:h-12 object-cover rounded-full"
          />
          <div>
            <p className="text-lg font-bold">Nguyen Thanh Thuan</p>
            <p>
              <span>255</span> bạn bè
            </p>
          </div>
        </div>
        <Button
          onClick={() => navigate("/profile/edit")}
          className="bg-blue-600 hover:bg-blue-500 flex items-center gap-3"
        >
          {" "}
          <Pencil />
          Chỉnh sửa
        </Button>
      </div>

      <div className="mt-5 flex flex-col ">
        <p className="text-xl font-bold mb-5">Giới thiệu</p>
        <div className="flex flex-col gap-5 text-lg">
          <p>
            Giới tính: <span>Nam</span>
          </p>
          <p>
            Tên tài khoản: <span>abc12345</span>
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
