import { useAuth } from "@/context/AuthProvider";
import { useDislikePost, useLikePost } from "@/react-query/post";
import { IPost, IUser } from "@/types";
import { Heart, Loader, MessagesSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { effect } from "zod";

type PostStatsProps = {
  post: IPost;
};
const PostStats = ({ post }: PostStatsProps) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { mutate: likePost, isLoading: isLikeing } = useLikePost();
  const { mutate: dislike } = useDislikePost();
  const likesList = post.likes.map((user: any) => user.userLike.id);
  const [likes, setLikes] = useState<string[]>(likesList);

  const handleLike = () => {
    let likesArray = [...likes];

    if (likesArray.includes(currentUser?.id as string)) {
      likesArray = likesArray.filter((Id) => Id !== currentUser?.id);
    } else {
      likesArray.push(currentUser?.id as string);
    }

    setLikes(likesArray);
    likePost(post.id);
  };

  const checkIsLiked = (likeList: string[], userId: string) => {
    return likeList.includes(userId);
  };
  const handleDislike = () => {
    let likesArray = [...likes];

    if (likesArray.includes(currentUser?.id as string)) {
      likesArray = likesArray.filter((Id) => Id !== currentUser?.id);
    } else {
      likesArray.push(currentUser?.id as string);
    }

    setLikes(likesArray);
    dislike(post.id);
  };

  return (
    <div className={`flex justify-start items-center z-20 `}>
      <div className="flex gap-2 mr-5">
        {checkIsLiked(likes, currentUser?.id as string) ? (
          <button onClick={handleDislike}>
            {isLikeing ? <Loader /> : <Heart fill="red" />}
          </button>
        ) : (
          <button onClick={handleLike}>
            <Heart />
          </button>
        )}
        <p className="small-medium lg:base-medium">{post.likes.length}</p>
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
