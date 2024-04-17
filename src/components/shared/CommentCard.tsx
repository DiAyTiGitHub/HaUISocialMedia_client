import { Link } from "react-router-dom";
import reply from "/reply.svg";
import { useState } from "react";
import Comment from "./Comment";
import ReplyComment from "./ReplyComment";
import { IComment } from "@/types";
import { useGetSubComment } from "@/react-query/comment";

import { multiFormatDateString } from "@/lib/utils";

type CommentCardProps = {
  comment: IComment;
};

const CommentCard = ({ comment }: CommentCardProps) => {
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
              <p className="text-small-medium">
                {" "}
                {multiFormatDateString(comment?.createDate.toString())}
              </p>
            </Link>

            <p className="mt-2 ">{comment?.content}</p>

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
                {comment.numsOfSubComments > 0 && (
                  <p
                    className="mt-1 text-subtle-medium text-gray-1 hover:text-primary cursor-pointer"
                    onClick={handleShowReplyComment}
                  >
                    {comment.numsOfSubComments} phản hồi
                  </p>
                )}
              </div>
              {showReplyComment && <ReplyComment commentId={comment.id} />}

              {openReply && (
                <Comment postId={comment.post.id} repliCommentId={comment.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CommentCard;
