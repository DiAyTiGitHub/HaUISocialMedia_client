import friend from "@/assets/icons/friend.svg";
import group from "@/assets/icons/group.svg";
import wishlist from "@/assets/icons/wishlist.svg";

export const sidebarLink = [
  {
    label: "Bạn bè",
    route: "/friends",
    icon: friend,
  },
  {
    label: "Những bài đăng đã thích",
    route: "/wishlist",
    icon: wishlist,
  },
  {
    label: "Nhóm",
    route: "/groups",
    icon: group,
  },
];
