import { useGetAllData } from "@/lib";
import LocalStorageService from "@/services/LocalStorageService";
import { useStore } from "@/stores";
import GroupCard from "./ui/GroupCard";

const GroupJoined = () => {
  const currentUser = LocalStorageService.getLoggedInUser();
  const { groupStore } = useStore();
  const { getAllJoinedGroupOfUser } = groupStore;
  const { res: groups } = useGetAllData({
    getRequest: getAllJoinedGroupOfUser,
    requestId: currentUser?.id,
  });
  return (
    <div className=" mt-5 p-5 mx-auto">
      <div>
        <h2 className="h3-bold my-5 capitalize ">Nhóm đã tham gia</h2>
        {!groups || groups.length === 0 ? (
          <p className="small-regular">Chưa có nhóm nào</p>
        ) : (
          <div className="flex flex-wrap gap-5">
            {groups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupJoined;
