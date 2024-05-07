import { Input } from "@mui/material";
import { Search } from "lucide-react";
import Pagination from "./Pagination";
import { useStore } from "@/stores";
import { useGetDataPagination } from "@/lib";
import { useEffect, useState } from "react";
import { SearchObjectType } from "@/types";
import CreateCourse from "./CreateCourse";
import TableCourse from "./TableCourse";

const AdminCoursePage = () => {
  const [paging, setPaging] = useState<SearchObjectType>({
    pageSize: 5,
    pageIndex: 1,
  });
  const { courseStore } = useStore();
  const { pagingCourse } = courseStore;
  const [filteredData, setFilteredData] = useState<SearchObjectType[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const {
    res: dataclass,
    isLoading,
    isLeftDisable,
    isRightDisable,
  } = useGetDataPagination({ getRequest: pagingCourse, paging: paging });
  const handleChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    setFilteredData(dataclass);
  }, [dataclass]);

  const handleClick = () => {
    if (searchValue) {
      const filtered = dataclass.filter((item) => {
        const itemName = item.name.toLowerCase();
        const searchKeyword = searchValue.toLowerCase();
        return itemName.includes(searchKeyword);
      });
      setFilteredData(filtered);
      console.log(filtered);
    } else {
      setFilteredData(dataclass);
    }
  };

  return (
    <div className="px-5 bg-blue-2 h-screen w-full mr-5 rounded-md">
      <div className="flex flex-col w-full">
        <div className="mt-5 w-full px-5">
          <h2 className="text-body-medium">Danh sách Học phần</h2>
          <div className="w-full flex justify-between mt-2">
            <div className="flex items-end">
              <Input
                type="search"
                className="px-5"
                placeholder="Tìm Học phần..."
                onChange={handleChange}
              />
              <button className="bg-primary p-2" onClick={handleClick}>
                <Search color="#fff" />
              </button>
            </div>
            <div>
              <CreateCourse />
            </div>
          </div>
        </div>

        <div className="mt-10 px-10 bg-white shadow-lg py-10 rounded-sm">
          <TableCourse classData={filteredData} isLoading={isLoading} />
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

export default AdminCoursePage;
