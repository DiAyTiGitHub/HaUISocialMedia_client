import { useGetAllData } from "@/lib";
import LocalStorageService from "@/services/LocalStorageService";
import { useStore } from "@/stores";
import GroupItem from "./GroupItem";
import { Link } from "react-router-dom";
import NoData from "@/components/shared/NoData";

const ListGroupJoined = () => {
  const currentUser = LocalStorageService.getLoggedInUser();
  const { groupStore } = useStore();
  const { getAllJoinedGroupOfUser } = groupStore;
  const { res: groups } = useGetAllData({
    getRequest: getAllJoinedGroupOfUser,
    requestId: currentUser?.id,
  });

  return (
    <>
      {!groups || groups.length === 0 ? (
        <NoData title="Tạo nhóm hoặc tham gia nhóm" style="h-[80px] w-[80px]" />
      ) : (
        <div className="flex flex-col gap-2">
          {groups?.slice(0, 3)?.map((group) => (
            <GroupItem group={group} key={group?.id} />
          ))}
          <Link
            to={`/group/joined`}
            className="bg-slate-200 small-medium cursor-pointer flex items-center p-2 w-full justify-center rounded-md"
          >
            Xem thêm
          </Link>
        </div>
      )}
    </>
  );
};

export default ListGroupJoined;
