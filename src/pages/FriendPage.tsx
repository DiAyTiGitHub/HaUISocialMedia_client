import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { listFriend } from "@/mockData";
const FriendPage = () => {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col flex-1  gap-10 mx-5 lg:ml-[26%]">
        <div className="flex-1 bg-white p-5">
          <h3 className="h3-bold mb-5">Danh sách bạn bè</h3>
          <div className="user-grid">
            {listFriend.map((friend: any) => (
              <div
                key={friend.id}
                className="flex items-center gap-5 p-3 border border-light-2 rounded-xl"
              >
                <img
                  src={friend.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex justify-between flex-1">
                  <div>
                    <p className="font-semibold">{friend.name}</p>
                    <span>{friend.class}</span>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-500">
                    Bạn bè
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendPage;
