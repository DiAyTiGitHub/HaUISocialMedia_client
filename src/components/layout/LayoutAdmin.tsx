import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const LayoutAdmin = () => {
  return (
    <div className="flex gap-5">
      <AdminSidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutAdmin;