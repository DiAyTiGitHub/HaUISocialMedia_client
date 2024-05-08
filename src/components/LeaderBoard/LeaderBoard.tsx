import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { useStore } from "@/stores";
import { useGetDataObjectPagination } from "@/lib";
import Pagination from "./Pagination";
import Icon from "../shared/Icon";
import { Input } from "../ui/input";

const ItemTable = ({ data, stt }: { data: any; stt: number }) => {
  const navigate = useNavigate();
  return (
    <tr
      onClick={() => {
        navigate(`/profile/${data.user.id}`);
        window.location.href = `/profile/${data.user.id}`;
      }}
    >
      <td className={`px-3 py-2 text-sm text-center `}>
        <span>{stt}</span>
      </td>

      <td className="px-4 py-3">
        <div className="flex justify-center gap-10 text-sm m-0">
          <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
            <img
              className="object-cover w-full h-full rounded-full"
              src={data?.user?.avatar || "/person.jpg"}
              alt="image"
            />
          </div>
        </div>
      </td>

      <td className="px-4 py-3 text-sm text-center">
        {data?.user?.code || "Chưa cập nhật"}
      </td>
      <td className="px-4 py-3 text-sm text-center">{data?.user?.lastName}</td>
      <td className="px-4 py-3 text-sm text-center">{data.user.firstName}</td>

      <td className="px-4 py-3 text-sm text-center">
        <p className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
          {data.user.username}
        </p>
      </td>

      <td className="px-4 py-3 text-sm text-center">{data.numsOfA}</td>
      <td className="px-4 py-3 text-sm text-center">{data.numsOfBPlus}</td>
      <td className="px-4 py-3 text-sm text-center">{data.numsOfB}</td>
      <td className="px-4 py-3 text-sm text-center">{data.numsOfCPlus}</td>
      <td className="px-4 py-3 text-sm text-center">{data.numsOfC}</td>
      <td className="px-4 py-3 text-sm text-center">{data.numsOfDPlus}</td>
      <td className="px-4 py-3 text-sm text-center">{data.numsOfD}</td>
    </tr>
  );
};

type PagingType = {
  pageSize: number;
  pageIndex: number;
};
const LeaderBoard = () => {
  const { leaderBoardStore } = useStore();
  const { getLeadingDashBoard } = leaderBoardStore;

  const [paging, setPaging] = useState<PagingType>({
    pageSize: 20,
    pageIndex: 1,
  });

  const {
    res: leaderBoardData,
    isLoading,
    isLeftDisable,
    isRightDisable,
  } = useGetDataObjectPagination({
    getRequest: getLeadingDashBoard,
    paging: paging,
  });

  const handleSTT = (index: number) => {
    return paging.pageSize * (paging.pageIndex - 1) + index + 1;
  };

  return (
    <div className="bg-white p-3 shadow-md rounded-md">
      <p className="text-heading3-bold">Bảng xếp hạng thành tích</p>
      <div className="mt-2 flex justify-between">
        <Input
          placeholder="Tìm kiếm ..."
          className="px-4 py-2 rounded-xl w-1/3  outline-none border border-blue-500"
          disabled
        />
        <div className="flex gap-3 items-center">
          <Button className="flex gap-3 items-center" disabled>
            <Icon name="Filter" />
            <span>Lọc</span>
          </Button>
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-lg shadow-xs mt-5">
        <div className="w-full overflow-x-auto ">
          {isLoading && <TableSkeleton length={5} styles="" />}
          {!isLoading && (
            <>
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
                  {leaderBoardData?.data?.map((data: any, index: number) => (
                    <ItemTable
                      key={data.id}
                      data={data}
                      stt={handleSTT(index)}
                    />
                  ))}
                </tbody>
              </table>
              {leaderBoardData?.data?.length === 0 && (
                <span className="flex justify-center mt-5">
                  Chưa có dữ liệu
                </span>
              )}
            </>
          )}
        </div>
      </div>

      <Pagination
        isLeftDisable={isLeftDisable}
        isRightDisable={isRightDisable}
        setPaging={setPaging}
      />
    </div>
  );
};

export default LeaderBoard;
