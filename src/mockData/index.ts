import avatar from "@/assets/avatar.png";

export const currentUser = {
  id: "1",
  password: "1",
  fullname: "Nguyen Thanh Thuan",
  phone: "0123456789",
  username: "1",
  avatar: avatar,
  gender: "Nam",
  class: "KTPM",
};

export const listFriend = [
  {
    id: 1,
    name: "Nguyen Thanh Thuan",
    avatar: avatar,
    class: "KTPM",
  },
  {
    id: 2,
    name: "Ninh van hai",
    avatar: avatar,
    class: "KTPM",
  },
  {
    id: 3,
    name: "Le Thi Ngoc Anh",
    avatar: avatar,
    class: "KTPM",
  },
  {
    id: 4,
    name: "Dinh Tien Dat",
    avatar: avatar,
    class: "KTPM",
  },
  {
    id: 5,
    name: "Phung Quang Cuong",
    avatar: avatar,
    class: "KTPM",
  },
  {
    id: 6,
    name: "Nguyen Thanh Thuan",
    avatar: avatar,
    class: "KTPM",
  },
  {
    id: 8,
    name: "Ninh van hai",
    avatar: avatar,
    class: "KTPM",
  },
  {
    id: 9,
    name: "Le Thi Ngoc Anh",
    avatar: avatar,
    class: "KTPM",
  },
  {
    id: 10,
    name: "Dinh Tien Dat",
    avatar: avatar,
    class: "KTPM",
  },
  {
    id: 11,
    name: "Phung Quang Cuong",
    avatar: avatar,
    class: "KTPM",
  },
  {
    id: 12,
    name: "Nguyen Thanh Thuan",
    avatar: avatar,
    class: "KTPM",
  },
  {
    id: 13,
    name: "Ninh van hai",
    avatar: avatar,
    class: "KTPM",
  },
  {
    id: 14,
    name: "Le Thi Ngoc Anh",
    avatar: avatar,
    class: "KTPM",
  },
  {
    id: 15,
    name: "Dinh Tien Dat",
    avatar: avatar,
    class: "KTPM",
  },
  {
    id: 16,
    name: "Phung Quang Cuong",
    avatar: avatar,
    class: "KTPM",
  },
];

type UserType = {
  _id: string;
  username: string;
  profileImage: string;
};

type MessageType = {
  chat: string;
  sender: UserType;
  text: string;
  createdAt: Date;
  seenBy: UserType[];
};
type ChatType = {
  members: UserType[];
  messages: MessageType[];
};

export const chats: ChatType[] = [
  {
    members: [
      {
        _id: "2",
        username: "Thanh Thuan",
        profileImage:
          "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
    messages: [
      {
        chat: "1",
        sender: {
          _id: "1",
          username: "Nguoi gui",
          profileImage:
            "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        text: "Noi dung tin nhan noi dung tin nhan",
        createdAt: new Date(),
        seenBy: [
          {
            _id: "2",
            username: "Nguoi xem",
            profileImage:
              "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          },
        ],
      },
    ],
  },

  {
    members: [
      {
        _id: "2",
        username: "Thanh Thuan",
        profileImage:
          "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
    messages: [
      {
        chat: "1",
        sender: {
          _id: "1",
          username: "Nguoi gui",
          profileImage:
            "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        text: "Noi dung tin nhan noi dung tin nhan",
        createdAt: new Date(),
        seenBy: [
          {
            _id: "2",
            username: "Nguoi xem",
            profileImage:
              "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          },
        ],
      },
    ],
  },
  {
    members: [
      {
        _id: "2",
        username: "Thanh Thuan",
        profileImage:
          "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
    messages: [
      {
        chat: "1",
        sender: {
          _id: "1",
          username: "Nguoi gui",
          profileImage:
            "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        text: "Noi dung tin nhan noi dung tin nhan",
        createdAt: new Date(),
        seenBy: [
          {
            _id: "2",
            username: "Nguoi xem",
            profileImage:
              "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          },
        ],
      },
    ],
  },
  {
    members: [
      {
        _id: "2",
        username: "Thanh Thuan",
        profileImage:
          "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
    messages: [
      {
        chat: "1",
        sender: {
          _id: "1",
          username: "Nguoi gui",
          profileImage:
            "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        text: "Noi dung tin nhan noi dung tin nhan",
        createdAt: new Date(),
        seenBy: [
          {
            _id: "2",
            username: "Nguoi xem",
            profileImage:
              "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          },
        ],
      },
    ],
  },
  {
    members: [
      {
        _id: "2",
        username: "Thanh Thuan",
        profileImage:
          "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
    messages: [
      {
        chat: "1",
        sender: {
          _id: "1",
          username: "Nguoi gui",
          profileImage:
            "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        text: "Noi dung tin nhan noi dung tin nhan",
        createdAt: new Date(),
        seenBy: [
          {
            _id: "2",
            username: "Nguoi xem",
            profileImage:
              "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          },
        ],
      },
    ],
  },
  {
    members: [
      {
        _id: "2",
        username: "Thanh Thuan",
        profileImage:
          "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
    messages: [
      {
        chat: "1",
        sender: {
          _id: "1",
          username: "Nguoi gui",
          profileImage:
            "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        text: "Noi dung tin nhan noi dung tin nhan",
        createdAt: new Date(),
        seenBy: [
          {
            _id: "2",
            username: "Nguoi xem",
            profileImage:
              "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          },
        ],
      },
    ],
  },
  {
    members: [
      {
        _id: "2",
        username: "Thanh Thuan",
        profileImage:
          "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
    messages: [
      {
        chat: "1",
        sender: {
          _id: "1",
          username: "Nguoi gui",
          profileImage:
            "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        text: "Noi dung tin nhan noi dung tin nhan",
        createdAt: new Date(),
        seenBy: [
          {
            _id: "2",
            username: "Nguoi xem",
            profileImage:
              "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          },
        ],
      },
    ],
  },
  {
    members: [
      {
        _id: "2",
        username: "Thanh Thuan",
        profileImage:
          "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
    messages: [
      {
        chat: "1",
        sender: {
          _id: "1",
          username: "Nguoi gui",
          profileImage:
            "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        text: "Noi dung tin nhan noi dung tin nhan",
        createdAt: new Date(),
        seenBy: [
          {
            _id: "2",
            username: "Nguoi xem",
            profileImage:
              "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          },
        ],
      },
    ],
  },
  {
    members: [
      {
        _id: "2",
        username: "Thanh Thuan",
        profileImage:
          "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
    messages: [
      {
        chat: "1",
        sender: {
          _id: "1",
          username: "Nguoi gui",
          profileImage:
            "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        text: "Noi dung tin nhan noi dung tin nhan",
        createdAt: new Date(),
        seenBy: [
          {
            _id: "2",
            username: "Nguoi xem",
            profileImage:
              "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          },
        ],
      },
    ],
  },
  {
    members: [
      {
        _id: "2",
        username: "Thanh Thuan",
        profileImage:
          "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
    messages: [
      {
        chat: "1",
        sender: {
          _id: "1",
          username: "Nguoi gui",
          profileImage:
            "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        text: "Noi dung tin nhan noi dung tin nhan",
        createdAt: new Date(),
        seenBy: [
          {
            _id: "2",
            username: "Nguoi xem",
            profileImage:
              "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          },
        ],
      },
    ],
  },
  {
    members: [
      {
        _id: "2",
        username: "Thanh Thuan",
        profileImage:
          "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
    messages: [
      {
        chat: "1",
        sender: {
          _id: "1",
          username: "Nguoi gui",
          profileImage:
            "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        text: "Noi dung tin nhan noi dung tin nhan",
        createdAt: new Date(),
        seenBy: [
          {
            _id: "2",
            username: "Nguoi xem",
            profileImage:
              "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          },
        ],
      },
    ],
  },
  {
    members: [
      {
        _id: "2",
        username: "Thanh Thuan",
        profileImage:
          "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
    messages: [
      {
        chat: "1",
        sender: {
          _id: "1",
          username: "Nguoi gui",
          profileImage:
            "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        text: "Noi dung tin nhan noi dung tin nhan",
        createdAt: new Date(),
        seenBy: [
          {
            _id: "2",
            username: "Nguoi xem",
            profileImage:
              "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          },
        ],
      },
    ],
  },
  {
    members: [
      {
        _id: "2",
        username: "Thanh Thuan",
        profileImage:
          "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
    messages: [
      {
        chat: "1",
        sender: {
          _id: "1",
          username: "Nguoi gui",
          profileImage:
            "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        text: "Noi dung tin nhan noi dung tin nhan",
        createdAt: new Date(),
        seenBy: [
          {
            _id: "2",
            username: "Nguoi xem",
            profileImage:
              "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          },
        ],
      },
    ],
  },
  {
    members: [
      {
        _id: "2",
        username: "Thanh Thuan",
        profileImage:
          "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
    messages: [
      {
        chat: "1",
        sender: {
          _id: "1",
          username: "Nguoi gui",
          profileImage:
            "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        text: "Noi dung tin nhan noi dung tin nhan",
        createdAt: new Date(),
        seenBy: [
          {
            _id: "2",
            username: "Nguoi xem",
            profileImage:
              "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          },
        ],
      },
    ],
  },
  {
    members: [
      {
        _id: "2",
        username: "Thanh Thuan",
        profileImage:
          "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
    messages: [
      {
        chat: "1",
        sender: {
          _id: "1",
          username: "Nguoi gui",
          profileImage:
            "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        text: "Noi dung tin nhan noi dung tin nhan",
        createdAt: new Date(),
        seenBy: [
          {
            _id: "2",
            username: "Nguoi xem",
            profileImage:
              "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          },
        ],
      },
    ],
  },
  {
    members: [
      {
        _id: "2",
        username: "Thanh Thuan",
        profileImage:
          "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
    messages: [
      {
        chat: "1",
        sender: {
          _id: "1",
          username: "Nguoi gui",
          profileImage:
            "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        text: "Noi dung tin nhan noi dung tin nhan",
        createdAt: new Date(),
        seenBy: [
          {
            _id: "2",
            username: "Nguoi xem",
            profileImage:
              "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          },
        ],
      },
    ],
  },
  {
    members: [
      {
        _id: "2",
        username: "Thanh Thuan",
        profileImage:
          "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
    messages: [
      {
        chat: "1",
        sender: {
          _id: "1",
          username: "Nguoi gui",
          profileImage:
            "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        text: "Noi dung tin nhan noi dung tin nhan",
        createdAt: new Date(),
        seenBy: [
          {
            _id: "2",
            username: "Nguoi xem",
            profileImage:
              "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          },
        ],
      },
    ],
  },
  {
    members: [
      {
        _id: "2",
        username: "Thanh Thuan",
        profileImage:
          "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
    messages: [
      {
        chat: "1",
        sender: {
          _id: "1",
          username: "Nguoi gui",
          profileImage:
            "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        text: "Noi dung tin nhan noi dung tin nhan",
        createdAt: new Date(),
        seenBy: [
          {
            _id: "2",
            username: "Nguoi xem",
            profileImage:
              "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          },
        ],
      },
    ],
  },
  {
    members: [
      {
        _id: "2",
        username: "Thanh Thuan",
        profileImage:
          "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
    messages: [
      {
        chat: "1",
        sender: {
          _id: "1",
          username: "Nguoi gui",
          profileImage:
            "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        text: "Noi dung tin nhan noi dung tin nhan",
        createdAt: new Date(),
        seenBy: [
          {
            _id: "2",
            username: "Nguoi xem",
            profileImage:
              "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          },
        ],
      },
    ],
  },
  {
    members: [
      {
        _id: "2",
        username: "Thanh Thuan",
        profileImage:
          "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
    messages: [
      {
        chat: "1",
        sender: {
          _id: "1",
          username: "Nguoi gui",
          profileImage:
            "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        text: "Noi dung tin nhan noi dung tin nhan",
        createdAt: new Date(),
        seenBy: [
          {
            _id: "2",
            username: "Nguoi xem",
            profileImage:
              "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          },
        ],
      },
    ],
  },
  {
    members: [
      {
        _id: "2",
        username: "Thanh Thuan",
        profileImage:
          "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
    messages: [
      {
        chat: "1",
        sender: {
          _id: "1",
          username: "Nguoi gui",
          profileImage:
            "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        text: "Noi dung tin nhan noi dung tin nhan",
        createdAt: new Date(),
        seenBy: [
          {
            _id: "2",
            username: "Nguoi xem",
            profileImage:
              "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          },
        ],
      },
    ],
  },
  {
    members: [
      {
        _id: "2",
        username: "Thanh Thuan",
        profileImage:
          "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
    messages: [
      {
        chat: "1",
        sender: {
          _id: "1",
          username: "Nguoi gui",
          profileImage:
            "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        text: "Noi dung tin nhan noi dung tin nhan",
        createdAt: new Date(),
        seenBy: [
          {
            _id: "2",
            username: "Nguoi xem",
            profileImage:
              "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          },
        ],
      },
    ],
  },
  {
    members: [
      {
        _id: "2",
        username: "Thanh Thuan",
        profileImage:
          "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
    messages: [
      {
        chat: "1",
        sender: {
          _id: "1",
          username: "Nguoi gui",
          profileImage:
            "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        text: "Noi dung tin nhan noi dung tin nhan",
        createdAt: new Date(),
        seenBy: [
          {
            _id: "2",
            username: "Nguoi xem",
            profileImage:
              "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          },
        ],
      },
    ],
  },
];
