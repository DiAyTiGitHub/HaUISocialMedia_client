const AdminHomePage = () => {
  return (
    <div
      className="container"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridGap: "1rem",
      }}
    >
      <div className="w-25 grid p-4 grid-cols-[1fr_2fr_1fr] border gap-x-8 relative mt-5 rounded-lg hover:bg-blue-2 ">
        <a
          className="flex items-center h-20 cursor-pointer  relative false"
          href="/admin/posts"
        >
          <img
            src="/home.svg"
            alt="icon"
            className="ml-4 w-16 h-16  relative"
          ></img>
          <h3> Home </h3>
        </a>
      </div>
      <div className="w-25 grid p-4 grid-cols-[1fr_2fr_1fr] border gap-x-8 relative mt-5 rounded-lg hover:bg-blue-2 ">
        <a
          className="flex items-center h-20 cursor-pointer hover:bg-blue-2 relative false"
          href="/admin/posts"
        >
          <img
            src="/discover.svg"
            alt="icon"
            className="ml-4 w-16 h-16  relative"
          ></img>
          <h3>DASHBOARD</h3>
        </a>
      </div>
      <div className="w-25 grid p-4 grid-cols-[1fr_2fr_1fr] border gap-x-8 relative mt-5 rounded-lg hover:bg-blue-2 ">
        <a
          className="flex items-center h-20 cursor-pointer hover:bg-blue-2 relative false"
          href="/admin/posts"
        >
          <img
            src="/group.svg"
            alt="icon"
            className="ml-4 w-16 h-16  relative"
          ></img>
          <h3>Lớp học </h3>
        </a>
      </div>
      <div className="w-25 grid p-4 grid-cols-[1fr_2fr_1fr] border gap-x-8 relative mt-5 rounded-lg hover:bg-blue-2 ">
        <a
          className="flex items-center h-20 cursor-pointer hover:bg-blue-2 relative false"
          href="/admin/posts"
        >
          <img
            src="/suggestFriend.svg"
            alt="icon"
            className="ml-4 w-16 h-16  relative"
          ></img>
          <h3> NGười dùng </h3>
        </a>
      </div>
    </div>
  );
};

export default AdminHomePage;
