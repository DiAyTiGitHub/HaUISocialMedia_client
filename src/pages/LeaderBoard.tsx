import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import TableSkeleton from "@/components/skeleton/TableSkeleton";

const dataLeaderBoard = [
  {
    id: 1,
    code: 2021608410,
    firstName: "Thuan",
    lastName: "Nguyen",
    username: "thuant",
    totalA: 10,
    totalB: 10,
    totalB_: 10,
    totalC: 10,
    totalC_: 10,
    totalD: 10,
    totalD_: 10,
  },
  {
    id: 1,
    code: 2021608410,
    firstName: "Thuan",
    lastName: "Nguyen",
    username: "thuant",
    totalA: 10,
    totalB: 10,
    totalB_: 10,
    totalC: 10,
    totalC_: 10,
    totalD: 10,
    totalD_: 10,
  },
  {
    id: 1,
    code: 2021608410,
    firstName: "Thuan",
    lastName: "Nguyen",
    username: "thuant",
    totalA: 10,
    totalB: 10,
    totalB_: 10,
    totalC: 10,
    totalC_: 10,
    totalD: 10,
    totalD_: 10,
  },
  {
    id: 1,
    code: 2021608410,
    firstName: "Thuan",
    lastName: "Nguyen",
    username: "thuannt",
    totalA: 10,
    totalB: 10,
    totalB_: 10,
    totalC: 10,
    totalC_: 10,
    totalD: 10,
    totalD_: 10,
  },
];

const ItemTable = ({ data, stt }: { data: any; stt: number }) => {
  const navigate = useNavigate();
  return (
    <tr onClick={() => navigate("/")}>
      <td className={`px-3 py-2 text-sm text-center `}>
        <span>{stt}</span>
      </td>

      <td className="px-4 py-3">
        <div className="flex justify-center gap-10 text-sm m-0">
          <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
            <img
              className="object-cover w-full h-full rounded-full"
              src={
                data.avatar ||
                "https://images.unsplash.com/photo-1712924312776-e935a60b8b98?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt="image"
            />
          </div>
        </div>
      </td>

      <td className="px-4 py-3 text-sm text-center">{data.code}</td>
      <td className="px-4 py-3 text-sm text-center">{data.lastName}</td>
      <td className="px-4 py-3 text-sm text-center">{data.firstName}</td>

      <td className="px-4 py-3 text-sm text-center">
        <p className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
          {data.username}
        </p>
      </td>

      <td className="px-4 py-3 text-sm text-center">{data.totalB}</td>
      <td className="px-4 py-3 text-sm text-center">{data.totalB}</td>
      <td className="px-4 py-3 text-sm text-center">{data.totalB}</td>
      <td className="px-4 py-3 text-sm text-center">{data.totalB}</td>
      <td className="px-4 py-3 text-sm text-center">{data.totalB}</td>
      <td className="px-4 py-3 text-sm text-center">{data.totalB}</td>
      <td className="px-4 py-3 text-sm text-center">{data.totalB}</td>
    </tr>
  );
};

type PagingType = {
  pageSize: number;
  pageIndex: number;
};
const LeaderBoard = () => {
  const [paging, setPaging] = useState<PagingType>({
    pageSize: 20,
    pageIndex: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  // const [dataLeaderBoard, setDataLeaderBoard] = useState<[]>([]);

  // const getData = async () => {
  //   try {
  //     const res = await fetch("", {
  //       method: "GET",
  //     });
  //     const data = await res.json();
  //     setDataLeaderBoard(data);
  //     setLoading(false);
  //   } catch (err) {
  //     console.log("[leaderboard_GET]", err);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  const handleSTT = (index: number) => {
    return paging.pageSize * paging.pageIndex + index + 1;
  };

  return (
    <div className="bg-white p-3 shadow-md rounded-md">
      <p className="text-heading3-bold">Bảng xếp hạng thành tích</p>
      <div className="mt-2 flex justify-between">
        <input
          placeholder="Tìm kiếm ..."
          className="px-4 py-2 rounded-xl w-1/3  outline-none border border-blue-500"
        />
        <div className="flex gap-3 items-center">
          <Button>
            Lọc
            <Filter className="text-[12px] ml-3" />
          </Button>
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-lg shadow-xs mt-5">
        <div className="w-full overflow-x-auto ">
          {isLoading && <TableSkeleton length={5} styles="" />}
          {!isLoading && (
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="text-xs tracking-wide font-bold text-left text-gray-500 uppercase border-b ">
                  <td className="px-4 py-3 text-center">STT</td>
                  <td className="px-4 py-3 text-center">Ảnh</td>
                  <td className="px-4 py-3 text-center">Mã SV</td>
                  <td className="px-4 py-3 text-center">Họ</td>
                  <td className="px-4 py-3 text-center">Tên</td>
                  <td className="px-4 py-3 text-center">Tên người dùng</td>
                  <td className="px-4 py-3 text-center">A</td>
                  <td className="px-4 py-3 text-center">B+</td>
                  <td className="px-4 py-3 text-center">B</td>
                  <td className="px-4 py-3 text-center">C+</td>
                  <td className="px-4 py-3 text-center">C</td>
                  <td className="px-4 py-3 text-center">D+</td>
                  <td className="px-4 py-3 text-center">D</td>
                </tr>
              </thead>

              <tbody className="bg-white divide-y ">
                {dataLeaderBoard.map((data: any, index: number) => (
                  <ItemTable key={data.id} data={data} stt={handleSTT(index)} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="mt-5 flex justify-center flex-wrap gap-5">
        <Button>Trước</Button>
        <Button>Sau</Button>
      </div>
    </div>
  );
};

export default LeaderBoard;
