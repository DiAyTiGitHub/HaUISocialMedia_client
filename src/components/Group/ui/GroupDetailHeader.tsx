import { Button } from "@/components/ui/button";
import DropdoownMenuAdmin from "./DropdoownMenuAdmin";
import UserWaitList from "./UserWaitList";
import CustomButtonGroup from "./CustomButtonGroup";
import { useStore } from "@/stores";
import { useCheckUserSendRequestJoinGroup } from "@/lib";
import { useParams } from "react-router-dom";
import { handleCheckUserJoinedGroup } from "@/lib/utils";
import LeaveGroup from "./LeaveGroup";

type Props = {
  group: any;
  isAdmin: boolean;
};

const GroupDetailHeader = ({ group, isAdmin }: Props) => {
  const { groupId } = useParams();
  const { groupStore } = useStore();
  const { joinGroup } = groupStore;

  const isJoined = handleCheckUserJoinedGroup(group);

  // const isSendRequest = useCheckUserSendRequestJoinGroup(groupId);
  // console.log(isSendRequest);

  return (
    <div className="w-full bg-white pb-10">
      <div className="max-w-[95%] mx-auto  ">
        <div className="flex flex-col">
          <div className="w-full h-[350px] flex justify-center relative ">
            <img
              src={group?.backGroundImage || "/bg-haui.jpg"}
              alt="image"
              className="w-full h-full object-cover  rounded-b-lg"
            />
            <div className="absolute bottom-0 left-0 right-0">
              <p className="small-medium text-white bg-blue-500 px-10 py-3 rounded-b-lg">
                Nhóm của
                <span>
                  {" "}
                  {group?.user?.lastName} {group?.user?.firstName}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-3">
            <div>
              <p className="h3-bold capitalize">{group?.name}</p>
              {group?.userJoins?.length === 0 ? (
                <p>Thành viên: Chưa có thành viên nào</p>
              ) : (
                <p>
                  Thành viên: <span>{group?.userJoins?.length}</span>
                </p>
              )}
            </div>

            <div className="flex justify-between">
              {group?.userJoins?.length !== 0 && (
                <div className="flex ">
                  {group?.userJoins?.slice(0, 8)?.map((d: any) => (
                    <img
                      className="profile-photo rounded-full -ml-2"
                      src={d?.user?.avatar || "/person.jpg"}
                      alt="profle-img"
                      key={d?.id}
                    />
                  ))}
                </div>
              )}

              <div className="flex-end">
                {isAdmin ? (
                  <div className="flex gap-5">
                    <UserWaitList />
                    <DropdoownMenuAdmin group={group} />
                  </div>
                ) : (
                  <div>
                    {isJoined ? (
                      <LeaveGroup id={group?.id} />
                    ) : (
                      <CustomButtonGroup
                        message="Đã yêu cầu tham gia"
                        handleFn={joinGroup}
                        id={group?.id}
                        style="bg-blue-500"
                      >
                        Tham Gia Nhóm
                      </CustomButtonGroup>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetailHeader;
