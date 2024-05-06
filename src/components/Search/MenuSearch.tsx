import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const searchMenu = [
  {
    route: "/search",
    label: "Tất Cả",
  },
  {
    route: "/search/posts",
    label: "Bài viết",
  },
  {
    route: "/search/users",
    label: "Mọi Người",
  },
  {
    route: "/search/groups",
    label: "Nhóm",
  },
];

const MenuSearch = () => {
  const [searchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get("name"));
  const { pathname } = useLocation();
  useEffect(() => {
    setSearchText(searchParams.get("name"));
  }, []);
  return (
    <div className="sticky top-0 bg-white h-screen basis-1/5 p-3">
      <div className="flex flex-col h-full">
        <p className="small-medium my-2">Bộ lọc</p>
        <div className="rounded-xl">
          {searchMenu.map((item) => (
            <Link
              key={item.route}
              to={`${item.route}?name=${searchText}`}
              className={`flex items-center h-12 cursor-pointer hover:bg-blue-2 relative ${
                pathname === item.route && "bg-light rounded-lg"
              }`}
            >
              <h3 className="ml-2 text-base-medium relative">{item.label}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuSearch;
