import Comment from "../Comment/Comment";
import CommentCard from "../Comment/CommentCard";
import { multiFormatDateString } from "@/lib/utils";

import { useStore } from "@/stores";
import { IComment, IPost } from "@/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const images = [
  "https://images.unsplash.com/photo-1712992510624-3bb00e23fe76?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1712171314766-4087f2e84711?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1669997804140-ecc75729b583?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1712839398283-5b5bc134d9dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNXx8fGVufDB8fHx8fA%3D%3D",
];

const PostDetail = () => {
  const { postStore, commentStore } = useStore();
  const { getPostById } = postStore;
  const { getParentCommentOfPost } = commentStore;

  const { postId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [postDetail, setPostDetail] = useState<IPost>();
  const [comments, setComments] = useState<IComment[]>([]);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const data = await getPostById(postId as string);
        const comment = await getParentCommentOfPost(postId as string);
        setPostDetail(data);
        setComments(comment);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getPost();
  }, []);

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
  if (isLoading) return <span>Đang tải...</span>;
  if (!postDetail)
    return <p className="text-body-bold">Không tồn tại bài viết</p>;
  return (
    <div className="max-w-[70%] mx-auto my-auto">
      <div className="grid grid-cols-2 overflow-hidden">
        <div className="sticky top-[88px] bg-white py-5 px-5 rounded-lg shadow-lg  max-h-[calc(100vh_-_88px)] overflow-y-auto">
          <div className=" flex gap-3">
            <Link to="/" className="">
              <img
                src={postDetail?.creator.avatar || "/person.jpg"}
                alt="creator"
                className="w-10 h-10 rounded-full"
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

          <div className="mt-2 max-w-[40vw]">{postDetail?.content}</div>
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

        <div className="flex-1 bg-white p-5 rounded-lg shadow-sm  h-[calc(100vh_-_88px)] overflow-y-auto">
          <div className="mt-7">
            <p className="body-bold">Bình luận</p>
            <Comment postId={postDetail?.id || ""} />
          </div>

          <div className="mt-3 max-w-[40vw] ">
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
