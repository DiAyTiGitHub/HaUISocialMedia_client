import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import avatar from "@/assets/avatar.png";
import { Button } from "../ui/button";
// get gobal state
const currentUser = {
  id: 1,
  name: "Nguyen Thanh Thuan",
  avatar: avatar,
};

const dataChat = [
  {
    userId: 1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsam exercitationem ad, deleniti iste enim corporis nemo, fugiat repudiandae impedit nesciunt provident? Deleniti cupiditate hic amet ut quaerat sed officiis!",
    avatar: avatar,
  },
  {
    userId: 2,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsam exercitationem ad, deleniti iste enim corporis nemo, fugiat repudiandae impedit nesciunt provident? Deleniti cupiditate hic amet ut quaerat sed officiis!",
    avatar: avatar,
  },
  {
    userId: 1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsam exercitationem ad, deleniti iste enim corporis nemo, fugiat repudiandae impedit nesciunt provident? Deleniti cupiditate hic amet ut quaerat sed officiis!",
    avatar: avatar,
  },
  {
    userId: 2,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsam exercitationem ad, deleniti iste enim corporis nemo, fugiat repudiandae impedit nesciunt provident? Deleniti cupiditate hic amet ut quaerat sed officiis!",
    avatar: avatar,
  },
  {
    userId: 1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsam exercitationem ad, deleniti iste enim corporis nemo, fugiat repudiandae impedit nesciunt provident? Deleniti cupiditate hic amet ut quaerat sed officiis!",
    avatar: avatar,
  },
  {
    userId: 2,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsam exercitationem ad, deleniti iste enim corporis nemo, fugiat repudiandae impedit nesciunt provident? Deleniti cupiditate hic amet ut quaerat sed officiis!",
    avatar: avatar,
  },
  {
    userId: 1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsam exercitationem ad, deleniti iste enim corporis nemo, fugiat repudiandae impedit nesciunt provident? Deleniti cupiditate hic amet ut quaerat sed officiis!",
    avatar: avatar,
  },
  {
    userId: 2,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsam exercitationem ad, deleniti iste enim corporis nemo, fugiat repudiandae impedit nesciunt provident? Deleniti cupiditate hic amet ut quaerat sed officiis!",
    avatar: avatar,
  },
  {
    userId: 1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsam exercitationem ad, deleniti iste enim corporis nemo, fugiat repudiandae impedit nesciunt provident? Deleniti cupiditate hic amet ut quaerat sed officiis!",
    avatar: avatar,
  },
  {
    userId: 2,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsam exercitationem ad, deleniti iste enim corporis nemo, fugiat repudiandae impedit nesciunt provident? Deleniti cupiditate hic amet ut quaerat sed officiis!",
    avatar: avatar,
  },
  {
    userId: 1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsam exercitationem ad, deleniti iste enim corporis nemo, fugiat repudiandae impedit nesciunt provident? Deleniti cupiditate hic amet ut quaerat sed officiis!",
    avatar: avatar,
  },
  {
    userId: 2,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsam exercitationem ad, deleniti iste enim corporis nemo, fugiat repudiandae impedit nesciunt provident? Deleniti cupiditate hic amet ut quaerat sed officiis!",
    avatar: avatar,
  },
  {
    userId: 1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsam exercitationem ad, deleniti iste enim corporis nemo, fugiat repudiandae impedit nesciunt provident? Deleniti cupiditate hic amet ut quaerat sed officiis!",
    avatar: avatar,
  },
  {
    userId: 2,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsam exercitationem ad, deleniti iste enim corporis nemo, fugiat repudiandae impedit nesciunt provident? Deleniti cupiditate hic amet ut quaerat sed officiis!",
    avatar: avatar,
  },
  {
    userId: 1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsam exercitationem ad, deleniti iste enim corporis nemo, fugiat repudiandae impedit nesciunt provident? Deleniti cupiditate hic amet ut quaerat sed officiis!",
    avatar: avatar,
  },
  {
    userId: 2,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsam exercitationem ad, deleniti iste enim corporis nemo, fugiat repudiandae impedit nesciunt provident? Deleniti cupiditate hic amet ut quaerat sed officiis!",
    avatar: avatar,
  },
  {
    userId: 1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsam exercitationem ad, deleniti iste enim corporis nemo, fugiat repudiandae impedit nesciunt provident? Deleniti cupiditate hic amet ut quaerat sed officiis!",
    avatar: avatar,
  },
];

const ChatBox = () => {
  return (
    <div className=" bg-white rounded-lg p-5 max-h-[80vh] w-full overflow-y-scroll">
      <div className="">
        <span className="flex gap-2">
          <Link to="/chats">Nhắn tin</Link> <ChevronRight />
          Thanh Thuan
        </span>

        <div className="my-10 p-5   flex w-full flex-col gap-5 lg:max-h-[350px] overflow-y-scroll">
          {dataChat.map((data) => (
            <div
              className={`flex gap-5  ${
                currentUser.id === data.userId
                  ? "flex-row-reverse self-end"
                  : ""
              }`}
            >
              <img
                src={data.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <p
                className={`text-xs max-w-[500px] rounded-2xl  p-3 ${
                  currentUser.id === data.userId
                    ? "bg-light-3 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                {data.desc}
              </p>
            </div>
          ))}
        </div>
        <hr className="h-0 border border-light-4 mb-5" />
        <form className="flex justify-between items-center">
          <textarea
            placeholder="Gửi tin nhắn"
            className="w-[80%] h-16 p-2 border border-light-3 rounded-lg"
          />
          <Button className="bg-blue-600 hover:bg-blue-500 w-24">Gửi</Button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
