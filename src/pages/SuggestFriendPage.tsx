import SidebarFriendPage from "@/components/shared/SidebarFriendPage";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
import * as apiClient from "@/react-query/query-api";
import { useSendRequestFriend } from "@/react-query/relationship";
import { IUser } from "@/types";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
export type suggestFriendsPagination = {
  pageIndex: number;
  pageSize: number;
};

const SuggestFriendPage = () => {
  const { mutate: sendRequest } = useSendRequestFriend();
  const [suggestFriendPagination, setSuggestFriendPagination] =
    useState<suggestFriendsPagination>({
      pageIndex: 0,
      pageSize: 10,
    });

  const [friends, setFriends] = useState<IUser[]>();

  const mutation = useMutation(apiClient.getSuggestFriends, {
    onSuccess: async (data: any) => {
      setFriends(data);
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });
  useEffect(() => {
    mutation.mutate(suggestFriendPagination);
  }, [suggestFriendPagination]);
  console.log(friends);
  const handleSendRequestFriend = (friendId: string) => {
    sendRequest(friendId);
  };
  return (
    <div className="grid grid-cols-[1fr_3fr] mt-5">
      <SidebarFriendPage />
      <div className="flex flex-col gap-10 mx-5">
        <div className="flex-1 p-5">
          <div className="mb-5">
            <h3 className="h3-bold mb-5">Danh sách gợi ý</h3>
            <div className="flex items-center bg-white max-w-max  rounded-xl">
              <input
                type="text"
                placeholder="Tìm bạn bè..."
                className="input input-field"
              />
              <button className="btn btn-primary">
                <Search />
              </button>
            </div>
          </div>

          <div className=" grid grid-cols-2 gap-5 my-10">
            {!friends || friends.length === 0 ? (
              <span>Không có bạn bè gợi ý</span>
            ) : (
              friends.map((friend: IUser) => (
                <div
                  key={friend.id}
                  className="flex items-center gap-5 p-3 bg-white border border-light-2 rounded-xl"
                >
                  <img
                    src={friend.avatar || "/person.jpg"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex justify-between flex-1">
                    <p className="font-semibold">
                      {friend.lastName} {friend.firstName}
                    </p>

                    <Button onClick={() => handleSendRequestFriend(friend.id)}>
                      Thêm bạn bè
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestFriendPage;
