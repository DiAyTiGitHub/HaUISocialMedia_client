import avatar from "@/assets/avatar.png";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

const PortCard = () => {
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
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

        <Link to="/">
          <Edit />
        </Link>
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
