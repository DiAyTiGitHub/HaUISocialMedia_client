import ProfileInfo from "@/components/User/ProfileInfo";
import SessionCreatePost from "@/components/Post/SessionCreatePost";
import { memo, useEffect, useState } from "react";
import { IUser, SearchObjectType } from "@/types";
import { useParams } from "react-router-dom";
import Loader from "@/components/shared/Loader";
import PostList from "@/components/Post/PostList";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, parseISO } from "date-fns";
import FriendOfUser from "@/components/Relationship/FriendOfUser";
import UserCourseResult from "../CourseResult/UserCourseResult";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { useStore } from "@/stores";
import { useGetDataByUserId } from "@/lib";
import { observer } from "mobx-react";
import { Grid } from "@mui/material";

import './ProfileStyle.scss';

function Profile() {
  const { profileId } = useParams();
  const { postStore, userStore } = useStore();
  const [paging, setPaging] = useState<SearchObjectType>({
    pageIndex: 1,
    pageSize: 10,
  });
  const [userProfile, setUserProfile] = useState<IUser>();
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const { getUserById } = userStore;
  const { getPostOfUser } = postStore;
  const {
    ref,
    res: posts,
    isLoading,
    showLoadMore,
  } = useGetDataByUserId({
    getRequest: getPostOfUser,
    paging: paging,
    setPaging: setPaging,
    userId: profileId,
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoadingUser(true);
        const data = await getUserById(profileId as string);
        setUserProfile(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingUser(false);
      }
    };
    getUser();
  }, [profileId]);

  return (
    <div className="max-w-[80%] mx-auto">
      <ProfileInfo userProfile={userProfile} isLoading={isLoadingUser} />

      <div className="flex mt-4">
        <Grid container spacing={1}>
          <Grid item xs={12} md={5} lg={4}>
            <div className="">

              <Tabs defaultValue="all" className="w-full pb-10 chats tabStyle">
                <TabsList className="bg-white">
                  <TabsTrigger value="all">Giới thiệu</TabsTrigger>
                  <TabsTrigger value="private">Bạn bè</TabsTrigger>
                  <TabsTrigger value="result">Thành tích</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  {isLoadingUser ? (
                    <TableSkeleton
                      styles="chats h-max-content w-full overflow-y-auto"
                      length={5}
                    />
                  ) : (
                    <div className="h-max-content overflow-y-auto ">
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
                            <span>
                              {userProfile?.phoneNumber || "Chưa cập nhật"}
                            </span>
                          </p>
                          <p>
                            Địa chỉ:{" "}
                            <span>{userProfile?.address || "Chưa cập nhật"}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="private">
                  <div className=" h-[100vh] overflow-y-auto ">
                    <FriendOfUser profileId={profileId as string} />
                  </div>
                </TabsContent>
                <TabsContent value="result" className="w-full">
                  <UserCourseResult userId={profileId as string} />
                </TabsContent>
              </Tabs>
            </div>
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            <div className="flex-1 flex flex-col">
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
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default memo(observer(Profile));
