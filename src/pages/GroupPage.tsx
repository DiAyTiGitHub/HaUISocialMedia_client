import Sidebar from "@/components/layout/Sidebar";
const GroupPage = () => {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col flex-1  gap-10 mx-5 lg:ml-[26%]">
        <div className="flex-1 bg-white p-5">
          <h3 className="h3-bold mb-5">Danh sách nhóm của bạn</h3>
          <div className="user-grid"></div>
        </div>
      </div>
    </>
  );
};

export default GroupPage;
