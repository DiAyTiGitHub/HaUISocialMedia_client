import ProfileInfo from "@/components/shared/ProfileInfo";
import SessionCreatePost from "@/components/shared/SessionCreatePost";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useMutation } from "react-query";
import * as apiClient from "@/react-query/query-api";
import { newFeedPagination } from "./HomePage";
import { IPost } from "@/types";
import { useParams } from "react-router-dom";
import Loader from "@/components/shared/Loader";
import PostList from "@/components/shared/PostList";
import { useGetUseById } from "@/react-query/user";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, parseISO } from "date-fns";
import FriendOfUser from "@/components/shared/FriendOfUser";

const Profile = () => {
  const { profileId } = useParams();
  const { ref, inView } = useInView();
  const { data: userProfile, isLoading: isUserLoading } = useGetUseById(
    profileId as string
  );
  const [showLoadMore, setShowLoadMore] = useState<boolean>(true);
  const [newFeedPagination, setNewFeedPagination] = useState<newFeedPagination>(
    {
      pageIndex: 0,
      pageSize: 10,
    }
  );

  const [posts, setPosts] = useState<IPost[]>([]);

  const { mutate, isLoading } = useMutation(apiClient.getPostOfUser, {
    onSuccess: async (data: any) => {
      if (data && data.length > 0) {
        setNewFeedPagination((prev) => ({
          ...prev,
          pageIndex: prev.pageIndex + 1,
        }));
        setPosts((prev) => [...prev, ...data]);
        if (data.length < newFeedPagination.pageSize) setShowLoadMore(false);
      } else {
        if (!data || data.length === 0) setShowLoadMore(false);
      }
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });

  const handleGetData = () => {
    mutate({
      newFeedPagination: newFeedPagination,
      userId: profileId as string,
    });
  };
  useEffect(() => {
    if (inView) {
      handleGetData();
    }
  }, [inView, newFeedPagination]);

  return (
    <div className="max-w-[80%] mx-auto">
      <ProfileInfo userProfile={userProfile} isLoading={isUserLoading} />

      <div className="flex gap-3 mt-3">
        <div className="flex-1">
          <Tabs defaultValue="all">
            <TabsList className="bg-white">
              <TabsTrigger value="all">Giới thiệu</TabsTrigger>
              <TabsTrigger value="private">Bạn bè</TabsTrigger>
              <TabsTrigger value="result">Thành tích</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="chats h-max-content overflow-y-auto ">
                <div className="mt-5 flex flex-col ">
                  <p className="h3-bold mb-5">Giới thiệu</p>
                  <div className="flex flex-col gap-5 text-lg">
                    <p>
                      Giới tính:{" "}
                      <span>{userProfile?.gender ? "Nữ" : "Nam"}</span>
                    </p>
                    <p>
                      Mã sinh viên:{" "}
                      <span>{userProfile?.code || "Chưa cập nhật"}</span>
                    </p>
                    <p className="font-medium">
                      Tên tài khoản:{" "}
                      <span className="font-normal">
                        {userProfile?.username}
                      </span>
                    </p>
                    <p className="flex gap-2">
                      Ngày sinh:{" "}
                      <span>
                        {" "}
                        {userProfile?.birthDate ? (
                          <>
                            {format(
                              parseISO(
                                userProfile?.birthDate?.toString() || ""
                              ),
                              "yyy-MM-dd"
                            )}
                          </>
                        ) : (
                          <span>Chưa cập nhật</span>
                        )}
                      </span>
                    </p>
                    <p>
                      Email:{" "}
                      <span>{userProfile?.email || "Chưa cập nhật"} </span>
                    </p>
                    <p>
                      SDT:{" "}
                      <span>{userProfile?.phoneNumber || "Chưa cập nhật"}</span>
                    </p>
                    <p>
                      Địa chỉ:{" "}
                      <span>{userProfile?.address || "Chưa cập nhật"}</span>
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="private">
              <div className=" h-[100vh] overflow-y-auto ">
                <FriendOfUser profileId={profileId as string} />
              </div>
            </TabsContent>
            <TabsContent value="group"></TabsContent>
          </Tabs>
        </div>

        <div className="flex-1 flex flex-col gap-10">
          <SessionCreatePost />
          {!posts || posts.length === 0 ? (
            <p>Chưa có bài viết nào</p>
          ) : (
            <>
              <PostList posts={posts} isLoading={isLoading} />
            </>
          )}
          {showLoadMore && (
            <div ref={ref}>
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
