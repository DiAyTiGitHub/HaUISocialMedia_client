import avatar from "@/assets/avatar.png";
const listFriend = [
  {
    id: 1,
    name: "Nguyen Thanh Thuan",
    avatar: avatar,
  },
  {
    id: 2,
    name: "Ninh van hai",
    avatar: avatar,
  },
  {
    id: 3,
    name: "Le Thi Ngoc Anh",
    avatar: avatar,
  },
  {
    id: 4,
    name: "Dinh Tien Dat",
    avatar: avatar,
  },
  {
    id: 5,
    name: "Phung Quang Cuong",
    avatar: avatar,
  },
  {
    id: 1,
    name: "Nguyen Thanh Thuan",
    avatar: avatar,
  },
  {
    id: 2,
    name: "Ninh van hai",
    avatar: avatar,
  },
  {
    id: 3,
    name: "Le Thi Ngoc Anh",
    avatar: avatar,
  },
  {
    id: 4,
    name: "Dinh Tien Dat",
    avatar: avatar,
  },
  {
    id: 5,
    name: "Phung Quang Cuong",
    avatar: avatar,
  },
  {
    id: 1,
    name: "Nguyen Thanh Thuan",
    avatar: avatar,
  },
  {
    id: 2,
    name: "Ninh van hai",
    avatar: avatar,
  },
  {
    id: 3,
    name: "Le Thi Ngoc Anh",
    avatar: avatar,
  },
  {
    id: 4,
    name: "Dinh Tien Dat",
    avatar: avatar,
  },
  {
    id: 5,
    name: "Phung Quang Cuong",
    avatar: avatar,
  },
];

const ListFriendChat = () => {
  return (
    <div className="flex flex-col gap-10 bg-white p-5 max-h-[80vh] rounded-lg shadow-lg">
      <h3 className="text-3xl font-bold">Nhắn tin với bạn bè</h3>

      <div className="flex flex-col gap-5  overflow-y-scroll mt-5 px-3 ">
        {listFriend.map((friend) => (
          <div
            key={friend.id}
            className="flex gap-3 items-center cursor-pointer hover:bg-light-2 rounded-lg p-3"
          >
            <img
              src={friend.avatar}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <p className="font-medium">{friend.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListFriendChat;
