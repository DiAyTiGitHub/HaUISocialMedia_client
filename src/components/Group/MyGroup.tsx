import { useGetAllData } from "@/lib";
import { useStore } from "@/stores";
import GroupCard from "./ui/GroupCard";

const MyGroup = () => {
  const { groupStore } = useStore();
  const { getAllGroupUserIsAdmin } = groupStore;
  const { res: dataGroup, isLoading } = useGetAllData({
    getRequest: getAllGroupUserIsAdmin,
  });
  return (
    <div className=" mt-5 p-5 mx-auto">
      <div>
        <h2 className="h3-bold my-5 ">Quản lý nhóm</h2>
        {!dataGroup || dataGroup.length === 0 ? (
          <p className="small-regular">Chưa có nhóm nào</p>
        ) : (
          <div className="flex flex-wrap gap-5">
            {dataGroup.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGroup;
