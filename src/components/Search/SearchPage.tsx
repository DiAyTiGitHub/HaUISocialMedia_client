import { useGetAllDataByKeyword } from "@/lib";
import { useStore } from "@/stores";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import NoData from "../shared/NoData";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [paging, setPaging] = useState({
    keyWord: searchParams.get("name"),
  });
  const { loadingTotalStore } = useStore();
  const { pagingTotalByKeyword } = loadingTotalStore;
  const {
    res: dataSearch,
    isLoading,
    isError,
  } = useGetAllDataByKeyword({
    getRequest: pagingTotalByKeyword,
    paging: paging,
  });
  console.log(dataSearch);
  return (
    <div className="flex  flex-col  bg-white w-full mx-auto mt-3 rounded-lg">
      <div className="p-5">
        <h3 className="body-bold">
          Thông tin tìm kiếm:{" "}
          <span className="text-primary font-medium">
            {searchParams.get("name")}
          </span>
        </h3>

        {!dataSearch && <NoData title="Không có kết quả tìm kiếm" />}

        {dataSearch?.users?.length === 0 &&
        dataSearch?.posts?.length === 0 &&
        dataSearch?.groups?.length === 0 ? (
          <NoData title="Không có kết quả tìm kiếm" />
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default SearchPage;
