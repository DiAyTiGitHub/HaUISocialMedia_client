import { useDislikePost, useLikePost } from "@/react-query/post";
import { IPost } from "@/types";
import { Heart, MessagesSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

type PostStatsProps = {
  post: IPost;
};
const PostStats = ({ post }: PostStatsProps) => {
  const navigate = useNavigate();
  const { mutate: likePost } = useLikePost();
  const { mutate: dislike } = useDislikePost();
  const handleLike = () => {
    likePost(post.id);
  };
  const handleDislike = () => {
    dislike(post.id);
  };
  return (
    <div className={`flex justify-start items-center z-20 `}>
      <div className="flex gap-2 mr-5">
        <button onClick={() => handleDislike()}>
          <Heart fill="red" />
        </button>
        <p className="small-medium lg:base-medium">1</p>
      </div>

      <div className="flex gap-2">
        <button onClick={() => navigate(`/post/${post.id}`)}>
          <MessagesSquare />
        </button>
        <p className="small-medium lg:base-medium">{post.comments.length}</p>
      </div>
    </div>
  );
};

export default PostStats;
