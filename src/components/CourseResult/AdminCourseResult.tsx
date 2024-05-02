import { Input } from "@mui/material";
import { Search } from "lucide-react";
import Pagination from "./Pagination";
import { useStore } from "@/stores";
import { useGetDataPagination } from "@/lib";
import { useState } from "react";
import { SearchObjectType } from "@/types";
import TableCourseResult from "./TableCourseResult";
const AdminCourseResult = () => {
  const [paging, setPaging] = useState<SearchObjectType>({
    pageIndex: 1,
    pageSize: 10,
  });
  const { courseResultStore } = useStore();
  const { pagingCourseResult } = courseResultStore;

  const {
    res: dataCourseResult,
    isLoading,
    isLeftDisable,
    isRightDisable,
  } = useGetDataPagination({ getRequest: pagingCourseResult, paging: paging });

  return (
    <div className="px-5 bg-blue-2 h-screen w-full mr-5 rounded-md">
      <div className="flex flex-col w-full">
        <div className="mt-5 w-full px-5">
          <h2 className="text-body-medium">Danh sách kết quả khóa học</h2>
          <div className="w-full flex justify-between mt-2">
            <div className="flex items-end">
              <Input
                type="search"
                className="px-5"
                placeholder="Tìm theo khóa học..."
              />
              <button className="bg-primary p-2">
                <Search color="#fff" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 px-10 bg-white shadow-lg py-10 rounded-sm">
          <TableCourseResult
            classData={dataCourseResult}
            isLoading={isLoading}
          />
        </div>

        <Pagination
          isLeftDisable={isLeftDisable}
          isRightDisable={isRightDisable}
          setPaging={setPaging}
        />
      </div>
    </div>
  );
};

export default AdminCourseResult;
