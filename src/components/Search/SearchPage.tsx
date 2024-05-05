import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FriendCard from "@/components/shared/FriendCard";
import { Button } from "@/components/ui/button";

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
    <div className="flex  flex-col  bg-white w-full mx-auto mt-3 rounded-lg">
      <div className="p-5">
        <h3 className="body-bold">
          Thông tin tìm kiếm:{" "}
          <span className="text-primary font-medium">
            {searchParams.get("name")}
          </span>
        </h3>

        <div className="mt-3">
          <div>
            <p className="body-bold">Mọi người</p>
            <div>list user</div>
            <Link
              to={`/search/users?name=${searchParams.get("name")}`}
              className="flex gap-2 justify-center bg-slate-300 text-black py-2 mt-5 rounded-md hover:bg-slate-200 font-semibold"
            >
              Xem thêm
            </Link>
          </div>
          <div>
            <p className="body-bold">Bài viết</p>
            <div>list post</div>
            <Link
              to={`/search/posts?name=${searchParams.get("name")}`}
              className="flex gap-2 justify-center bg-slate-300 text-black py-2 mt-5 rounded-md hover:bg-slate-200 font-semibold"
            >
              Xem thêm
            </Link>
          </div>
          <div>
            <p className="body-bold">Nhóm</p>
            <div>list bài viết</div>
            <Link
              to={`/search/groups?name=${searchParams.get("name")}`}
              className="flex gap-2 justify-center bg-slate-300 text-black py-2 mt-5 rounded-md hover:bg-slate-200 font-semibold"
            >
              Xem thêm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
