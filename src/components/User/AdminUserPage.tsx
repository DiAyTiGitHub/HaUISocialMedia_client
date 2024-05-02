import { Input } from "@mui/material";
import { Search } from "lucide-react";
import { useStore } from "@/stores";
import useGetData from "@/lib";
import TableUser from "./TableUser";

const AdminUserPage = () => {
  const { userStore } = useStore();
  const { getAllUsers } = userStore;

  const { res: dataUser, isLoading } = useGetData({
    getRequest: getAllUsers,
    paging: false,
    setPaging: () => {},
  });

  return (
    <div className="px-5 bg-blue-2 h-screen w-full mr-5 rounded-md">
      <div className="flex flex-col w-full">
        <div className="mt-5 w-full px-5">
          <h2 className="text-body-medium">Danh sách User</h2>
          <div className="w-full flex justify-between mt-2">
            <div className="flex items-end">
              <Input
                type="search"
                className="px-5"
                placeholder="Tìm User theo tên..."
              />
              <button className="bg-primary p-2">
                <Search color="#fff" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 px-10 bg-white shadow-lg py-10 rounded-sm">
          <TableUser classData={dataUser} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default AdminUserPage;
