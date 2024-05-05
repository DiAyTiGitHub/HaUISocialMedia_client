import { IUser } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LocalStorage from "@/services/LocalStorageService";
import { useStore } from "@/stores";
import CustomButtonFriend from "@/components/Relationship/CustomButtonFriend";
type Props = {
  user: IUser | any;
};
type RelationshipType = {
  type: "IsFriend" | "IsSend" | "IsAccept" | "None" | "";
  title: string;
  handleFn: any;
  message: string;
  id: string;
};

const UserSearchCard = ({ user }: Props) => {
  const [relationship, setRelationship] = useState<RelationshipType>({
    type: "",
    title: "",
    handleFn: () => {},
    message: "",
    id: "",
  });
  const navigate = useNavigate();
  const currentUser = LocalStorage.getLoggedInUser();
  const { relationshipStore } = useStore();
  const { acceptFriend, unFriend, addFriend, unAcceptFriend } =
    relationshipStore;
  const handleCheckFriend = () => {
    if (user?.relationshipDto) {
      if (user.relationshipDto.state) {
        setRelationship((prev) => ({
          ...prev,
          type: "IsFriend",
          title: "Bạn bè",
          message: "Đã huỷ kết bạn",
          handleFn: unFriend,
          id: user.relationshipDto.id,
        }));
      } else {
        if (user.relationshipDto.requestSender.id === currentUser?.id) {
          setRelationship((prev) => ({
            ...prev,
            type: "IsSend",
            title: "Đã gửi lời mời",
            message: "Thêm bạn bè",
            handleFn: () => {},
            id: user.relationshipDto.id,
          }));
        } else {
          setRelationship((prev) => ({
            ...prev,
            type: "IsAccept",
            title: "Chấp nhận",
            message: "Bạn bè",
            handleFn: acceptFriend,
            id: user.relationshipDto.id,
          }));
        }
      }
    } else {
      setRelationship((prev) => ({
        ...prev,
        type: "None",
        title: "Thêm bạn bè",
        message: "Đã gửi lời mời",
        handleFn: addFriend,
        id: user?.id,
      }));
    }
  };

  useEffect(() => {
    handleCheckFriend();
  }, [user]);
  const handleNavigate = () => {
    navigate(`/profile/${user.id}`);
    window.location.href = `/profile/${user.id}`;
  };
  return (
    <div
      onClick={handleNavigate}
      className={`cursor-pointer bg-white px-5 py-3`}
    >
      <div className={`flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <img
            src={user?.avatar || "/person.jpg"}
            alt="avatar"
            className="profile-photo rounded-full "
          />
          <p className="font-semibold">
            {user?.lastName} {user?.firstName}
          </p>
        </div>

        <div>
          <>
            {relationship.type === "IsFriend" && (
              <div className="px-3 py-2 rounded-lg text-white bg-blue-500">
                Trang cá nhân
              </div>
            )}

            {relationship.type === "IsSend" && (
              <div className="flex gap-2 items-center">
                <CustomButtonFriend
                  title="Huỷ gửi lời mời"
                  message="Đã huỷ mời mời"
                  id={relationship.id}
                  handleFn={unAcceptFriend}
                />
                <CustomButtonFriend {...relationship} />
              </div>
            )}
            {relationship.type === "IsAccept" && (
              <div className="flex gap-2 items-center">
                <CustomButtonFriend
                  isSecondary
                  title="Từ chối"
                  message="Đã từ chối"
                  id={relationship.id}
                  handleFn={unAcceptFriend}
                />
                <CustomButtonFriend {...relationship} />
              </div>
            )}
            {relationship.type === "None" && (
              <div className="flex gap-2 items-center">
                <CustomButtonFriend {...relationship} />
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default UserSearchCard;
