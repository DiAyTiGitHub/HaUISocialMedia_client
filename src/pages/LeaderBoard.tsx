import { DataTable } from "@/components/custom-ui/DataTable";
import { useEffect, useState } from "react";
import { columns } from "@/components/shared/LeaderBoardColumn";
const LeaderBoard = () => {
  const [loading, setLoading] = useState(true);
  const [dataLeaderBoard, setDataLeaderBoard] = useState<[]>([]);

  const getProducts = async () => {
    try {
      const res = await fetch("", {
        method: "GET",
      });
      const data = await res.json();
      setDataLeaderBoard(data);
      setLoading(false);
    } catch (err) {
      console.log("[leaderboard_GET]", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="bg-white p-3 shadow-md rounded-md">
      <div className="flex items-center">
        <p className="text-heading3-bold">Bảng xếp hạng thành tích</p>
      </div>

      <DataTable columns={columns} data={dataLeaderBoard} searchKey="" />
    </div>
  );
};

export default LeaderBoard;
