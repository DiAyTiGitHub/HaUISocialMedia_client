import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useStore } from "@/stores";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../shared/Loader";

type Props = {
  id: string;
};
const DeleteClass = ({ id }: Props) => {
  const navigate = useNavigate();
  const { classStore } = useStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteClass } = classStore;

  const handleDeleteClass = async () => {
    try {
      setIsDeleting(true);
      await deleteClass(id);
      toast.success("Đã xoá lơp học này");
      setTimeout(() => {
        navigate(0);
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span className="text-red-600 cursor-pointer">Xoá</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn xoá</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn không thế khôi phục lại lớp học sau khi xoá
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500" onClick={handleDeleteClass}>
            {isDeleting ? <Loader /> : "Xoá"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteClass;
