import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TableStudent from "./TableStudent";
type Props = {
  students: any;
};
const ListStudent = ({ students }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="text-green-600 cursor-pointer">
          Danh sách sinh viên
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-6xl">
        <DialogHeader>
          <DialogTitle>Danh sách sinh viên</DialogTitle>
          <DialogDescription>
            Danh sách sinh viên tham gia lớp học này
          </DialogDescription>
        </DialogHeader>
        <>
          {!students ? (
            <span>Chưa có sinh viên nào</span>
          ) : (
            <div className="flex items-center space-x-2">
              <TableStudent />
            </div>
          )}
        </>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Đóng
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ListStudent;
