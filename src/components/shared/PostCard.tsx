import avatar from "@/assets/avatar.png";
import { Ellipsis, Eraser, Pencil } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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

const images = [
  "https://images.unsplash.com/photo-1712992510624-3bb00e23fe76?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1712171314766-4087f2e84711?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1669997804140-ecc75729b583?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1712839398283-5b5bc134d9dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNXx8fGVufDB8fHx8fA%3D%3D",
];
const PortCard = ({ post }: PostProps) => {
  const [dropdown, setdropDowm] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
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

      <div className="rounded-xl overflow-hidden my-2 gap-2 flex">
        <div className="basis-2/3">
          <img
            src={images[0]}
            alt="post-image"
            className="post-card_img"
            onClick={() => navigate(`/post/${post.id}`)}
          />
        </div>
        <div className="flex flex-col justify-between basis-1/3 ">
          {images.slice(1).map((image, index) => (
            <img
              key={index}
              src={image}
              alt="post-iamge"
              className="h-[150px] object-cover w-full rounded-[10px]"
              onClick={() => navigate(`/post/${post.id}`)}
            />
          ))}
        </div>
      </div>

      <PostStats post={post} />
    </div>
  );
};

export default PortCard;
