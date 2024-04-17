import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  return (
    <div className="bg-white max-w-[70%] mx-auto ]">
      <div className="h-[100vh-88px]"></div>
      <h3>Thông tin tìm kiếm</h3>
    </div>
  );
};

export default SearchPage;
