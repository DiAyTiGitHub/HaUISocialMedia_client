import ProfileInfo from "@/components/shared/ProfileInfo";
import SessionCreatePost from "@/components/shared/SessionCreatePost";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useMutation } from "react-query";
import * as apiClient from "@/react-query/query-api";
import { newFeedPagination } from "./HomePage";
import { IPost } from "@/types";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { ref, inView } = useInView();
  const { profileId } = useParams();
  const [newFeedPagination, setNewFeedPagination] = useState<newFeedPagination>(
    {
      pageIndex: 0,
      pageSize: 10,
    }
  );
  const [posts, setPosts] = useState<IPost[]>();

  const { mutate, isLoading } = useMutation(apiClient.getPostOfUser, {
    onSuccess: async (data: any) => {
      setPosts(data);
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });
  useEffect(() => {
    mutate({
      newFeedPagination: newFeedPagination,
      userId: profileId as string,
    });
  }, [newFeedPagination]);

  console.log(posts);

  useEffect(() => {
    if (inView) {
      setNewFeedPagination((prev) => ({
        ...prev,
        pageSize: prev.pageSize + 10,
      }));
    }
  }, [inView]);

  return (
    <div className="w-full grid grid-cols-[25vw_auto_20vw] gap-x-8 relative">
      <ProfileInfo />

      <div className="flex flex-col gap-10">
        <SessionCreatePost />
        {/* <PostList /> */}
      </div>
    </div>
  );
};

export default Profile;
