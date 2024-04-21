import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import UpdateResult from "../CourseResult/UpdateResult";
import ProfileInfoSkeletion from "../skeleton/ProfileInfoSkeletion";
import LocalStorage from "@/services/LocalStorageService";
import { memo } from "react";
import { observer } from "mobx-react";
type Props = {
  userProfile: any;
  isLoading: boolean;
};
function ProfileInfo({ userProfile, isLoading }: Props) {
  const navigate = useNavigate();

  const currentUser = LocalStorage.getLoggedInUser();

  if (isLoading) return <ProfileInfoSkeletion />;
  return (
    <div className="flex flex-col">
      <div className="w-full h-[200px]">
        <img
          src="/bg-haui.jpg"
          alt="image"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-white h-fit p-5">
        <div className="flex justify-between items-center  pb-5">
          <div className="flex items-center gap-2 -mt-14">
            <div className="">
              <img
                src={userProfile?.avatar || "/person.jpg"}
                alt="avartar"
                className=" w-36 h-36 object-cover rounded-full"
              />
            </div>
            <div>
              <p className="text-[28px] font-bold">
                {userProfile?.lastName} {userProfile?.firstName}
              </p>
            </div>
          </div>
          {currentUser?.id === userProfile?.id ? (
            <div className="flex items-center gap-3">
              <UpdateResult>
                <span className="cursor-pointer bg-blue-2 px-3 py-2 font-medium rounded-md">
                  Cập nhật thành tích học tập
                </span>
              </UpdateResult>

              <Button onClick={() => navigate("/profile/edit")}>
                <span>Cập nhật thông tin</span>
              </Button>
            </div>
          ) : (
            <Button>Bạn bè</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(observer(ProfileInfo));
