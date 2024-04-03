import { useGetSubComment } from "@/react-query/comment";
import CommentCard from "./CommentCard";

type ReplyCommentProps = {
  commentId: string;
};

const ReplyComment = ({ commentId }: ReplyCommentProps) => {
  const { data: subComment } = useGetSubComment(commentId);

  return (
    <div>
      {subComment?.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default ReplyComment;
