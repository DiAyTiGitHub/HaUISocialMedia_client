import { Link } from "react-router-dom";
import DeleteGroup from "../../Group/ui/DeleteGroup";
import {
  handleCheckUserIsAdmin,
  handleCheckUserJoinedGroup,
} from "@/lib/utils";
import CustomButtonGroup from "../../Group/ui/CustomButtonGroup";
import { useStore } from "@/stores";
import LeaveGroup from "../../Group/ui/LeaveGroup";

type Props = {
  group: any;
};

const GroupSearchCard = ({ group }: Props) => {
  const isAdmin = handleCheckUserIsAdmin(group);
  const { groupStore } = useStore();
  const { joinGroup } = groupStore;
  const isJoinedGroup = handleCheckUserJoinedGroup(group);
  return (
    <div className="w-full flex  bg-white p-5 rounded-md ">
      <div>
        <img
          src={group?.backGroundImage || "/bg-haui-jpg"}
          alt="group-img"
          className="w-20 h-20 object-cover rounded-md"
        />
      </div>
      <div className="flex flex-1 flex-col justify-start mx-2">
        <p className="small-medium max-w-40 capitalize">{group?.name}</p>
        <p className="small-normal text-wrap">{group?.description}</p>
        <p>
          Thành viên: <span>{group?.userJoins?.length}</span>
        </p>
      </div>

      {isAdmin ? (
        <div className="flex items-center gap-2 mt-4">
          <Link
            to={`/group/${group.id}`}
            className="bg-blue-100 font-medium hover:bg-opacity-80 text-blue-700 p-2  text-center rounded-md"
          >
            Xem Nhóm
          </Link>

          <DeleteGroup isDetail id={group?.id} />
        </div>
      ) : (
        <div className="flex gap-2 mt-4">
          <Link
            to={`/group/${group.id}`}
            className="bg-blue-100 font-medium hover:bg-opacity-80 text-blue-700 p-2  text-center rounded-md"
          >
            Xem Nhóm
          </Link>

          {isJoinedGroup ? (
            <LeaveGroup id={group?.id} />
          ) : (
            <CustomButtonGroup
              message="Đã yêu cầu tham gia"
              handleFn={joinGroup}
              id={group?.id}
              style="border border-green-500"
              variant="outline"
            >
              Tham Gia Nhóm
            </CustomButtonGroup>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupSearchCard;
