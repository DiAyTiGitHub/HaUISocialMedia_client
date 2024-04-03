import Comment from "@/components/shared/Comment";
import CommentCard from "@/components/shared/CommentCard";
import { Link } from "react-router-dom";

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
  return (
    <div className="mt-10 flex gap-x-10 justify-center max-h-screen ">
      <div>
        <div className=" mt-10 flex gap-3">
          <Link to="/" className="profile-photo">
            <img
              src={POST.user.avatar}
              alt="creator"
              className="rounded-full"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold">Thành Thuận</p>
            <div className="flex-center gap-2 ">
              <p className="subtle-semibold lg:small-regular ">2 ngày trước</p>•
            </div>
          </div>
        </div>

        <div className=" mt-2 max-w-[40vw]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus
          at laborum praesentium non quia illo commodi molestias veritatis odit
          officia esse accusantium nemo, harum obcaecati provident aut, velit
          nihil. Quod?
        </div>
        <div className="mt-10">
          <img
            src={POST.photo}
            alt="post-image"
            className="max-w-[640px] max-h-[420px] object-cover"
          />
        </div>
      </div>

      <div>
        <div className="mt-7">
          <p className="body-bold">Bình luận</p>
          <Comment />
        </div>

        <div className="mt-3 max-w-[40vw] max-h-screen overflow-scroll ">
          <p className="body-bold mb-3">Bình luận gần đây</p>
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
