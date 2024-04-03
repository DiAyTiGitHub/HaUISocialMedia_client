import { Link } from "react-router-dom";
import reply from "@/assets/icons/reply.svg";
import { useState } from "react";
import Comment from "./Comment";
import ReplyComment from "./ReplyComment";
interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author?: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments?: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

const CommentCard = () => {
  const [openReply, setOpenReply] = useState(false);
  const [showReplyComment, setShowReplyComment] = useState(false);

  const handleOpenReply = () => {
    setOpenReply((prev) => !prev);
  };

  const handleShowReplyComment = () => {
    setShowReplyComment((prev) => !prev);
  };
  return (
    <article className={`flex w-full flex-col rounded-xl pr-3`}>
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link to="/profile/1" className="relative h-11 w-11">
              <img
                src="/person.jpg"
                alt="profile-imge"
                className="cursor-pointer rounded-full"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <Link to={`/profile/1`} className="w-fit">
              <h4 className="cursor-pointer base-semibold">thanh thuan</h4>
            </Link>

            <p className="mt-2 ">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis
              at placeat ex possimus veritatis, aperiam libero quaerat explicabo
              quos, nulla quas quasi saepe neque praesentium reiciendis
              accusamus itaque magnam modi.
            </p>

            <div className={`my-5 flex flex-col gap-3`}>
              <div className="flex gap-3">
                <img
                  src={reply}
                  alt="reply-icon"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                  onClick={handleOpenReply}
                />
                {true && [1, 2, 3].length > 0 && (
                  <p
                    className="mt-1 text-subtle-medium text-gray-1 hover:text-primary cursor-pointer"
                    onClick={handleShowReplyComment}
                  >
                    {2} Phản hồi
                  </p>
                )}
              </div>
              {showReplyComment && <ReplyComment />}
              {openReply && <Comment />}
            </div>
          </div>
        </div>
      </div>

      {!true && [1, 2].length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {[1, 2].slice(0, 2).map((comment, index) => (
            <img
              key={index}
              src={"/person.jpg"}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}
        </div>
      )}
    </article>
  );
};

export default CommentCard;
