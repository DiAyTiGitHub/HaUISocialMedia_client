import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import UpdateResult from "../CourseResult/UpdateResult";
import ProfileInfoSkeletion from "../skeleton/ProfileInfoSkeletion";
import LocalStorage from "@/services/LocalStorageService";
import { memo, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useStore } from "@/stores";
import CustomButtonFriend from "../Relationship/CustomButtonFriend";
type Props = {
  userProfile: any;
  isLoading: boolean;
};
type RelationshipType = {
  title: string;
  handleFn: any;
  message: string;
  id: string;
};
function ProfileInfo({ userProfile, isLoading }: Props) {
  const [relationship, setRelationship] = useState<RelationshipType>({
    title: "",
    handleFn: () => {},
    message: "",
    id: "",
  });
  const { relationshipStore } = useStore();
  const { acceptFriend, unFriend, addFriend } = relationshipStore;
  const navigate = useNavigate();
  const currentUser = LocalStorage.getLoggedInUser();

  const handleCheckFriend = () => {
    if (userProfile?.relationship) {
      if (userProfile.relationship.state) {
        setRelationship((prev) => ({
          ...prev,
          title: "Bạn bè",
          message: "Đã huỷ kết bạn",
          handleFn: unFriend,
          id: userProfile.relationship.id,
        }));
      } else {
        if (userProfile.relationship.requestSender.id === currentUser?.id) {
          setRelationship((prev) => ({
            ...prev,
            title: "Đã gửi lời mời",
            message: "Thêm bạn bè",
            handleFn: () => {},
            id: userProfile.relationship.id,
          }));
        } else {
          setRelationship((prev) => ({
            ...prev,
            title: "Chấp nhận",
            message: "Bạn bè",
            handleFn: acceptFriend,
            id: userProfile.relationship.id,
          }));
        }
      }
    } else {
      setRelationship((prev) => ({
        ...prev,
        title: "Thêm bạn bè",
        message: "Đã gửi lời mời",
        handleFn: addFriend,
        id: userProfile?.id,
      }));
    }
  };

  useEffect(() => {
    handleCheckFriend();
  }, [userProfile]);

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
            <CustomButtonFriend {...relationship} />
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(observer(ProfileInfo));
