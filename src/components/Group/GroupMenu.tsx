import { groupMenu } from "@/constant";
import { Plus, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ListGroupJoined from "./ui/ListGroupJoined";

const GroupMenu = () => {
  const { pathname } = useLocation();
  return (
    <div className="sticky top-[88px] bg-white max-h-screen basis-1/5 p-3 overflow-y-auto">
      <div className="flex flex-col h-full">
        <h1 className="h3-bold">Nhóm</h1>
        <div className="flex items-center my-3">
          <Input
            type="text"
            placeholder="Tìm kiếm nhóm"
            className="border-none rounded-s-full"
            disabled
          />
          <Button className="rounded-e-full h-full" disabled>
            <Search />
          </Button>
        </div>

        <div className="mt-5 ">
          {groupMenu.map((link) => (
            <Link
              key={link.route}
              to={link.route}
              className={`flex items-center h-12 cursor-pointer hover:bg-blue-2 relative ${
                pathname === link.route && "sidebar-active"
              }`}
            >
              <img
                src={link.icon}
                alt="icon"
                className="ml-4 w-6 h-6  relative"
              />
              <h3 className="ml-2 text-base-medium relative">{link.label}</h3>
            </Link>
          ))}

          <Link
            to={`/group/create`}
            className="flex gap-2 justify-center bg-blue-200 text-blue-700 py-2 mt-5 rounded-md hover:bg-blue-100 font-semibold"
          >
            <Plus />
            Tạo Nhóm
          </Link>
        </div>

        <div className="w-full border border-slate-500 my-5"></div>
        <div className="flex flex-col gap-3">
          <p className="text-base font-semibold">Nhóm đã tham gia</p>
          <ListGroupJoined />
        </div>
      </div>
    </div>
  );
};

export default GroupMenu;
