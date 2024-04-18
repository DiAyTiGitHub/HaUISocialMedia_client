import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FriendCard from "@/components/shared/FriendCard";
import { IUser } from "@/types";
import { useSendRequestFriend } from "@/react-query/relationship";
import { Button } from "@/components/ui/button";
import PortCard from "@/components/shared/PostCard";

const data = {
  users: [
    {
      id: 1,
      firstName: "Thuan",
      lastNanme: "Thuan",
      address: "",
      birthDate: new Date(),
      classroomDto: "",
      code: ",",
      email: "",
      gender: "",
      password: "",
      phoneNumber: "",
      role: "",
      avatar:
        "https://images.unsplash.com/photo-1712992510624-3bb00e23fe76?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      address: "",
      birthDate: new Date(),
      classroomDto: "",
      code: ",",
      email: "",
      gender: "",
      password: "",
      phoneNumber: "",
      role: "",
      firstName: "Thuan",
      lastNanme: "Thuan",
      avatar:
        "https://images.unsplash.com/photo-1712992510624-3bb00e23fe76?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      firstName: "Thuan",
      lastNanme: "Thuan",
      address: "",
      birthDate: new Date(),
      classroomDto: "",
      code: ",",
      email: "",
      gender: "",
      password: "",
      phoneNumber: "",
      role: "",
      avatar:
        "https://images.unsplash.com/photo-1712992510624-3bb00e23fe76?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      firstName: "Thuan",
      lastName: "Thuan",
      address: "",
      birthDate: new Date(),
      classroomDto: "",
      code: ",",
      email: "",
      gender: "",
      password: "",
      phoneNumber: "",
      role: "",
      avatar:
        "https://images.unsplash.com/photo-1712992510624-3bb00e23fe76?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D",
    },
  ],
};
const SearchPage = () => {
  const [searchParams] = useSearchParams();

  return (
    <div className="flex flex-col  bg-white max-w-[70%] mx-auto mt-3 rounded-lg">
      <div className="p-5">
        <h3 className="text-[24px]">
          Thông tin tìm kiếm:{" "}
          <span className="text-primary font-medium">
            {searchParams.get("name")}
          </span>
        </h3>

        <div className="mt-3">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-white">
              <TabsTrigger value="all">Tất cả</TabsTrigger>
              <TabsTrigger value="users">Mọi người</TabsTrigger>
              <TabsTrigger value="posts">Bài viết</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div>
                <div className="w-full">
                  <p className="text-body-bold ">Mọi người</p>
                  <div className="flex flex-col gap-3 my-3">
                    {data.users.map((user) => (
                      <FriendCard
                        friend={user}
                        isShowButton={true}
                        key={user.id}
                      />
                    ))}
                  </div>
                  <Button className="w-full">Xem thêm</Button>
                </div>

                {/* // POSTS */}
                <div className="w-full">
                  <p className="text-body-bold ">Bài viết</p>
                  {/* <div className="flex flex-col gap-3 my-3">
                    {data.posts.map((post) => (
                      <PortCard key={post.id} post={post} />
                    ))}
                  </div> */}
                  <Button className="w-full">Xem thêm</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="users">
              <div className="w-full">
                <p className="text-body-bold ">Mọi người</p>
                <div className="flex flex-col gap-3 my-3">
                  {data.users.map((user) => (
                    <FriendCard
                      friend={user}
                      isShowButton={true}
                      key={user.id}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="post" className="w-full"></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
