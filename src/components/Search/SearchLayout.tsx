import MenuSearch from "./MenuSearch";
import { Outlet } from "react-router-dom";

const SearchLayout = () => {
  return (
    <div className="flex gap-5 h-screen">
      <MenuSearch />
      <div className="flex-1 max-w-2xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default SearchLayout;
