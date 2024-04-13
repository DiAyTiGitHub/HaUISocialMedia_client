import { Button } from "../ui/button";
import { Loader, Pencil } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { useGetUseById } from "@/react-query/user";
import { format, parseISO } from "date-fns";
const ProfileInfo = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { profileId } = useParams();
  const { data: userProfile, isLoading } = useGetUseById(profileId as string);
  console.log(userProfile);
  if (isLoading) return <Loader />;
  return (
    <div className="bg-white h-fit p-5">
      <div className="flex justify-between items-center border-b border-black pb-5">
        <div className="flex items-center gap-2">
          <div className="profile-photo">
            <img
              src={userProfile?.avatar || "/person.jpg"}
              alt="avartar"
              className="rounded-full"
            />
          </div>
          <div>
            <p className="text-base font-bold">
              {userProfile?.lastName} {userProfile?.firstName}
            </p>
          </div>
        </div>
        {currentUser?.id === userProfile?.id ? (
          <Button onClick={() => navigate("/profile/edit")}>
            <Pencil />
          </Button>
        ) : (
          <Button>Bạn bè</Button>
        )}
      </div>

      <div className="mt-5 flex flex-col ">
        <p className="h3-bold mb-5">Giới thiệu</p>
        <div className="flex flex-col gap-5 text-lg">
          <p>
            Giới tính: <span>{userProfile?.gender ? "Nữ" : "Nam"}</span>
          </p>
          <p className="font-medium">
            Tên tài khoản:{" "}
            <span className="font-normal">{userProfile?.username}</span>
          </p>
          <p className="flex gap-2">
            Ngày sinh:{" "}
            <span>
              {" "}
              {userProfile?.birthDate ? (
                <>
                  {format(
                    parseISO(userProfile?.birthDate?.toString() || ""),
                    "yyy-MM-dd"
                  )}
                </>
              ) : (
                <span>Chưa cập nhật</span>
              )}
            </span>
          </p>
          <p>
            Email: <span>{userProfile?.email || "Chưa cập nhật"} </span>
          </p>
          <p>
            SDT: <span>{userProfile?.phoneNumber || "Chưa cập nhật"}</span>
          </p>
          <p>
            Địa chỉ: <span>{userProfile?.address || "Chưa cập nhật"}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
