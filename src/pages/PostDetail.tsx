import Comment from "@/components/shared/Comment";
import CommentCard from "@/components/shared/CommentCard";
import { multiFormatDateString } from "@/lib/utils";
import { useGetComment } from "@/react-query/comment";
import { useGetPostById } from "@/react-query/post";
import { IComment } from "@/types";
import { Link, useParams } from "react-router-dom";

const POST = {
  photo: "https://cdn.pixabay.com/photo/2024/02/09/13/03/beach-8563083_640.jpg",
  user: {
    id: "1",
    firstname: "Dong",
    lastname: "Hai",
    avatar: "/person.jpg",
  },
};

const PostDetail = () => {
  const { postId } = useParams();
  //console.log(postId);
  const { data: postDetail, isLoading } = useGetPostById(postId as string);
  const { data: comments, isLoading: loadingComment } = useGetComment(
    postId as string
  );
  if (isLoading) return <span>Đang tải...</span>;
  if (!postDetail)
    return <p className="text-body-bold">Không tồn tại bài viết</p>;
  return (
    <div className="flex gap-x-10 justify-between max-h-screen ">
      <div className="sticky top-[1rem]">
        <div className=" flex gap-3">
          <Link to="/" className="profile-photo">
            <img
              src={postDetail?.creator.avatar || "/person.jpg"}
              alt="creator"
              className="rounded-full"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold">
              {postDetail?.creator.lastName} {postDetail?.creator.firstName}
            </p>
            <div className="flex gap-2 ">
              <p className="subtle-semibold lg:small-regular ">
                {multiFormatDateString(postDetail?.createDate.toString())}
              </p>
              •
            </div>
          </div>
        </div>

        <div className=" mt-2 max-w-[40vw]">{postDetail?.content}</div>
        <div className="mt-10">
          <img
            src={POST.photo}
            alt="post-image"
            className="max-w-[640px] max-h-[420px] object-cover"
          />
        </div>
      </div>

      <div className="flex-1">
        <div className="mt-7">
          <p className="body-bold">Bình luận</p>
          <Comment postId={postDetail?.id || ""} />
        </div>

        <div className="mt-3 max-w-[40vw] max-h-screen overflow-y-auto ">
          <p className="body-bold mb-3">Bình luận gần đây</p>
          {postDetail?.comments.length === 0 ? (
            <span>Chưa có bình luận nào</span>
          ) : (
            <>
              {comments
                ?.filter((item) => !item.repliedComment)
                .map((comment: IComment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
