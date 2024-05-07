import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UpdateCourse from "./UpdateCourse";
import DeleteCourse from "./DeleteCourse";

type Props = {
  classData: any;
  isLoading: boolean;
};
const TableCourse = ({ classData, isLoading }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Mã môn học</TableHead>
          <TableHead>Tên môn học</TableHead>
          <TableHead>Mô Tả</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <>
        {!classData ? (
          <span>Chưa có môn học nào</span>
        ) : (
          <TableBody>
            {classData.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.code}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-5 justify-end">
                    <UpdateCourse classData={item} />
                    <DeleteCourse id={item.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </>
    </Table>
  );
};

export default TableCourse;
