import avatar from "@/assets/avatar.png";
import { Ellipsis, Eraser, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PostForm from "@/pages/PostForm";
import PostStats from "./PostStats";
import React from "react";
import Delete from "./Delete";

const PortCard = () => {
  return (
    <div className="post-card">
      <div className="relative flex-between">
        <div className="  flex items-center gap-3">
          <Link to="/">
            <img
              src={avatar}
              alt="creator"
              className="w-12 lg:h-12 rounded-full"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-dark-1">Thành Thuận</p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular ">2 ngày trước</p>•
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                e.stopPropagation()
              }
            >
              <Ellipsis />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="relative right-10">
            <DropdownMenuItem>
              <PostForm>
                <button
                  className="flex gap-2 items-center"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    e.stopPropagation()
                  }
                >
                  <div className="flex gap-3 items-center">
                    <Pencil />
                    Chỉnh sửa
                  </div>
                </button>
              </PostForm>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Delete>
                <div className="flex gap-3 items-center">
                  <Eraser /> Xoá
                </div>
              </Delete>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Link
        to="/"
        // to={`/posts/${post.$id}`}
      >
        <div className="small-medium lg:base-medium py-5">
          <p>caption</p>
          <ul className="flex gap-1 mt-2">
            <li>tag</li>
            <li>tag</li>
          </ul>
        </div>

        <img src={avatar} alt="post image" className="post-card_img" />
      </Link>

      <PostStats />
    </div>
  );
};

export default PortCard;
