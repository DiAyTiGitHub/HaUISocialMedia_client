import LocalStorageService from "@/services/LocalStorageService";
import FriendListSearch from "./ui/UserListSearch";
import { useStore } from "@/stores";
import { useState } from "react";
import { useGetDataByUserId } from "@/lib";
import { SearchObjectType } from "@/types";
import UserListSearch from "./ui/UserListSearch";
import Loader from "../shared/Loader";
import FriendListSkeleton from "../skeleton/FriendListSkeleton";
import FriendCard from "../shared/FriendCard";
const SearchUserList = () => {
  const currentUser = LocalStorageService.getLoggedInUser();
  const { relationshipStore } = useStore();
  const { getFriendOfUser } = relationshipStore;
  const [paging, setPaging] = useState<SearchObjectType>({
    pageIndex: 1,
    pageSize: 20,
  });
  const {
    ref,
    res: friends,
    isLoading,
    showLoadMore,
  } = useGetDataByUserId({
    getRequest: getFriendOfUser,
    paging: paging,
    setPaging: setPaging,
    userId: currentUser?.id,
  });

  return (
    <div className="">
      <UserListSearch users={friends} isLoading={isLoading} />
      {showLoadMore && (
        <div ref={ref}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default SearchUserList;
