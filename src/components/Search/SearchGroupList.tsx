import { useGetAllData } from "@/lib";
import { useStore } from "@/stores";
import React from "react";
import GroupListSearch from "./ui/GroupListSearch";
const SearchGroupList = () => {
  const { groupStore } = useStore();
  const { getAllGroupUserIsAdmin } = groupStore;
  const { res: dataGroup, isLoading } = useGetAllData({
    getRequest: getAllGroupUserIsAdmin,
  });
  return (
    <div className="mt-5">
      <GroupListSearch groups={dataGroup} />
    </div>
  );
};

export default SearchGroupList;
