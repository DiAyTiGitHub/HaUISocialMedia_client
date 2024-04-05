import friend from "@/assets/icons/friend.svg";
import group from "@/assets/icons/group.svg";
import wishlist from "@/assets/icons/wishlist.svg";
import addFriend from "@/assets/icons/addFriend.svg";
import suggestFriend from "@/assets/icons/suggestFriend.svg";

export const sidebarLink = [
  {
    label: "Bạn bè",
    route: "/friends",
    icon: friend,
  },
  {
    label: "Yêu thích",
    route: "/wishlist",
    icon: wishlist,
  },
  {
    label: "Nhóm",
    route: "/groups",
    icon: group,
  },
];

export const sidebarFriendPage = [
  {
    label: "Danh sách bạn bè",
    route: "/friends",
    icon: friend,
  },
  {
    label: "Lời mời kết bạn",
    route: "/add-friends",
    icon: addFriend,
  },
  {
    label: "Gợi ý",
    route: "/suggest-friends",
    icon: suggestFriend,
  },
];
