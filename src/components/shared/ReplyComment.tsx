import CommentCard from "./CommentCard";

type ReplyCommentProps = {
  id_comment: string;
};

const ReplyComment = () => {
  // fetch reply commment data in here

  return (
    <div>
      <CommentCard />
    </div>
  );
};

export default ReplyComment;
