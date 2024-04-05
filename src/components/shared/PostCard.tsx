import avatar from "@/assets/avatar.png";
import { Ellipsis, Eraser, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import PostForm from "@/pages/PostForm";
import PostStats from "./PostStats";
import React, { useState } from "react";
import Delete from "./Delete";
import { IPost } from "@/types";
import { useAuth } from "@/context/AuthProvider";
import { useDeletePost } from "@/react-query/post";
import { multiFormatDateString } from "@/lib/utils";

type PostProps = {
  post: IPost;
};
const PortCard = ({ post }: PostProps) => {
  const [dropdown, setdropDowm] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const { mutate: deletePost, isLoading: isDeleting } = useDeletePost();
  const handleDeletePost = (postId: string) => {
    deletePost(postId);
  };
  return (
    <div className="bg-white rounded-xl p-4 my-4 text-base">
      <div className="relative flex-between">
        <div className="  flex items-center gap-3">
          <Link to={`/profile/${post.creator.id}`} className="profile-photo">
            <img
              src={post.creator.avatar || "/person.jpg"}
              alt="creator"
              className="rounded-full"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-dark-1">
              {post.creator.lastName} {post.creator.firstName}
            </p>
            <div className="flex gap-3 text-light-3">
              <p className="subtle-semibold lg:small-regular ">
                {multiFormatDateString(post.createDate.toString())}
              </p>
              •
            </div>
          </div>
        </div>
        {post.creator.id === currentUser?.id && (
          <div>
            <button onClick={() => setdropDowm((prev) => !prev)}>
              {" "}
              <Ellipsis />
            </button>
            <>
              {dropdown && (
                <div className="absolute right-2 flex flex-col gap-5 bg-slate-200 p-3 rounded-lg">
                  <PostForm post={post}>
                    <button
                      className="flex gap-2 items-center"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        e.stopPropagation()
                      }
                    >
                      <div className="flex gap-3 items-center">
                        <Pencil />
                        Chỉnh sửa
                      </div>
                    </button>
                  </PostForm>
                  <Delete
                    handleDelete={() => handleDeletePost(post.id)}
                    isDisable={isDeleting}
                  >
                    <div className="flex gap-3 items-center">
                      <Eraser /> Xoá
                    </div>
                  </Delete>
                </div>
              )}
            </>
          </div>
        )}
      </div>

      <div className="small-medium lg:base-medium py-5">
        <p>{post.content}</p>
      </div>

      <div className="rounded-xl overflow-hidden my-3">
        <img src={avatar} alt="post image" className="post-card_img" />
      </div>

      <PostStats post={post} />
    </div>
  );
};

export default PortCard;
