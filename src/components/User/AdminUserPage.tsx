import { Input } from "@mui/material";
import { Search } from "lucide-react";
import { useStore } from "@/stores";
import TableUser from "./TableUser";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { SearchObjectType } from "@/types";

const AdminUserPage = () => {
  const { userStore } = useStore();
  const { getAllUsers } = userStore;

  const [paging, setPaging] = useState<SearchObjectType>({
    pageSize: 5,
    pageIndex: 0,
    keyWord: "",
  });

  const [dataUser, setDataUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLeftDisable, setIsLeftDisable] = useState(true);
  const [isRightDisable, setIsRightDisable] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleClick = () => {
    setPaging((prevPaging) => ({
      ...prevPaging,
      keyWord: searchValue,
      pageIndex: 0, // Reset pageIndex to 0 when performing a new search
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsLeftDisable(true);
      setIsRightDisable(false);
      // Gọi API hoặc xử lý dữ liệu theo từ khóa tìm kiếm searchValue
      const response = await getAllUsers();
      setDataUser(response);
      setIsLoading(false);
      // Cập nhật trạng thái phân trang
      setIsLeftDisable(response.isFirstPage);
      setIsRightDisable(response.isLastPage);
    };

    fetchData();
  }, [paging, getAllUsers]);

  return (
    <div className="px-5 bg-blue-2 h-screen w-full mr-5 rounded-md">
      <div className="flex flex-col w-full">
        <div className="mt-5 w-full px-5">
          <h2 className="text-body-medium">Danh sách Tài khoản</h2>
          <div className="w-full flex justify-between mt-2">
            <div className="flex items-end">
              <Input
                type="search"
                className="px-5"
                placeholder="Tìm tài khoản..."
                onChange={handleChange}
              />
              <button className="bg-primary p-2" onClick={handleClick}>
                <Search color="#fff" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 px-10 bg-white shadow-lg py-10 rounded-sm">
          <TableUser userData={dataUser} isLoading={isLoading} />
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

export default AdminUserPage;
