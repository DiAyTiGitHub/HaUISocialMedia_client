import { Heart, MessagesSquare } from "lucide-react";

const PostStats = () => {
  return (
    <div className={`flex justify-start items-center z-20 `}>
      <div className="flex gap-2 mr-5">
        <button>
          <Heart />
        </button>
        <p className="small-medium lg:base-medium">10</p>
      </div>

      <div className="flex gap-2">
        <button>
          <MessagesSquare />
        </button>
        <p className="small-medium lg:base-medium">10</p>
      </div>
    </div>
  );
};

export default PostStats;
