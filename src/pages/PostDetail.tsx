import Comment from "@/components/shared/Comment";
import CommentCard from "@/components/shared/CommentCard";
import { multiFormatDateString } from "@/lib/utils";
import { useGetComment } from "@/react-query/comment";
import { useGetPostById } from "@/react-query/post";
import { IComment } from "@/types";
import { useState } from "react";
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

const images = [
  "https://images.unsplash.com/photo-1712992510624-3bb00e23fe76?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1712171314766-4087f2e84711?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1669997804140-ecc75729b583?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1712839398283-5b5bc134d9dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNXx8fGVufDB8fHx8fA%3D%3D",
];

const PostDetail = () => {
  const { postId } = useParams();
  const [imageIndex, setImageIndex] = useState(0);

  const changeSlide = (direction: string) => {
    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(images.length - 1);
      } else {
        setImageIndex(imageIndex - 1);
      }
    } else {
      if (imageIndex === images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }
  };
  const { data: postDetail, isLoading } = useGetPostById(postId as string);
  const { data: comments, isLoading: loadingComment } = useGetComment(
    postId as string
  );
  if (isLoading) return <span>Đang tải...</span>;
  if (!postDetail)
    return <p className="text-body-bold">Không tồn tại bài viết</p>;
  return (
    <div className="max-w-[70%] mx-auto">
      <div className="grid gap-x-10 grid-cols-2 max-h-screen ">
        <div className="sticky top-[1rem] bg-white py-5 px-10 rounded-lg shadow-lg">
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
          <div className="mt-10 relative">
            <div className="absolute top-1/2 flex items-center bg-white rounded-full">
              <img
                src="/arrow-left.svg"
                alt="arrow"
                onClick={() => changeSlide("left")}
                className="w-8 h-8"
              />
            </div>
            <div>
              <img
                src={images[imageIndex]}
                alt="post-image"
                className="post-card_img "
              />
            </div>

            <div className="absolute right-0 top-1/2 flex items-center bg-white rounded-full">
              <img
                src="/arrow-right.svg"
                alt="arrow"
                className="w-8 h-8"
                onClick={() => changeSlide("right")}
              />
            </div>
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
    </div>
  );
};

export default PostDetail;
