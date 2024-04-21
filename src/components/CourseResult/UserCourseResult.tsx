import { useState } from "react";
import TableSkeleton from "../skeleton/TableSkeleton";

const ItemTable = ({ data, stt }: { data: any; stt: number }) => {
  return (
    <tr>
      <td className={`px-3 py-2 text-sm text-center `}>
        <span>{stt}</span>
      </td>
      <td className="px-4 py-3 text-sm text-center">{data.courseName}</td>

      <td className="px-4 py-3 text-sm text-center">
        <p className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
          {data.result}
        </p>
      </td>
    </tr>
  );
};
const data = [
  {
    id: "1",
    courseName: "Java nâng cao",
    result: "A",
  },
  {
    id: "1",
    courseName: "Java nâng cao",
    result: "A",
  },
  {
    id: "1",
    courseName: "Java nâng cao",
    result: "A",
  },
  {
    id: "1",
    courseName: "Java nâng cao",
    result: "A",
  },
  {
    id: "1",
    courseName: "Java nâng cao",
    result: "A",
  },
  {
    id: "1",
    courseName: "Java nâng cao",
    result: "A",
  },
  {
    id: "1",
    courseName: "Java nâng cao",
    result: "A",
  },
  {
    id: "1",
    courseName: "Java nâng cao",
    result: "A",
  },
  {
    id: "1",
    courseName: "Java nâng cao",
    result: "A",
  },
  {
    id: "1",
    courseName: "Java nâng cao",
    result: "A",
  },
];
const UserCourseResult = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-white rounded-lg shadow-sm max-screen overflow-y-auto p-5">
      <div className="w-full overflow-hidden rounded-lg shadow-xs mt-5">
        <div className="w-full overflow-x-auto ">
          {isLoading && <TableSkeleton length={5} styles="" />}

          {!isLoading && (
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="text-xs tracking-wide font-bold text-left text-gray-500 uppercase border-b ">
                  <td className="px-4 py-3 text-center">STT</td>
                  <td className="px-4 py-3 text-center">Tên môn</td>
                  <td className="px-4 py-3 text-center">Kết quả</td>
                </tr>
              </thead>

              <tbody className="bg-white divide-y ">
                {data.map((d: any, index: number) => (
                  <ItemTable key={d.id} data={d} stt={index + 1} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserCourseResult;
