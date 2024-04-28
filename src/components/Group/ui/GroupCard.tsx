import { Link } from "react-router-dom";
import DeleteGroup from "./DeleteGroup";
import { handleCheckUserIsAdmin } from "@/lib/utils";
import CustomButtonGroup from "./CustomButtonGroup";
import { useStore } from "@/stores";

type Props = {
  group: any;
};

const GroupCard = ({ group }: Props) => {
  const isAdmin = handleCheckUserIsAdmin(group);
  const { groupStore } = useStore();
  const { joinGroup } = groupStore;
  return (
    <div className="basis-1/3 flex flex-col bg-white p-5 rounded-md ">
      <div className="flex gap-3">
        <img
          src={group?.backGroundImage || "/bg-haui-jpg"}
          alt="group-img"
          className="w-20 h-20 object-cover rounded-md"
        />
        <div className="flex flex-col justify-between">
          <p className="small-medium max-w-40 capitalize">{group?.name}</p>
          <p>
            Thành viên: <span>{group?.userJoins?.length}</span>
          </p>
        </div>
      </div>

      {isAdmin ? (
        <div className="flex gap-2 mt-4">
          <Link
            to={`/group/${group.id}`}
            className="bg-blue-100 font-medium hover:bg-opacity-80 text-blue-700 py-2 w-2/3 text-center rounded-md"
          >
            Xem Nhóm
          </Link>

          <DeleteGroup isDetail id={group?.id} />
        </div>
      ) : (
        <div className="flex gap-2 mt-4">
          <Link
            to={`/group/${group.id}`}
            className="bg-blue-100 font-medium hover:bg-opacity-80 text-blue-700 py-2 w-2/3 text-center rounded-md"
          >
            Xem Nhóm
          </Link>

          <CustomButtonGroup
            message="Đã yêu cầu tham gia"
            handleFn={joinGroup}
            id={group?.id}
            style="border border-green-500"
            variant="outline"
          >
            Tham Gia Nhóm
          </CustomButtonGroup>
        </div>
      )}
    </div>
  );
};

export default GroupCard;