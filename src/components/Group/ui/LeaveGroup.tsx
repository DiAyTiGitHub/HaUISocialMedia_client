import Loader from "@/components/shared/Loader";
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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useStore } from "@/stores";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
  id: string;
  isDetail?: boolean;
};
const LeaveGroup = ({ id, isDetail }: Props) => {
  const navigate = useNavigate();
  const { groupStore } = useStore();
  const [isLeaving, setIsLeaving] = useState(false);
  const { leaveGroup } = groupStore;

  const handleDeleteGroup = async () => {
    try {
      setIsLeaving(true);
      await leaveGroup(id);
      toast.success("Đã thoát nhóm  này");
      setTimeout(() => {
        navigate(0);
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLeaving(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {isDetail ? (
          <span className="max-w-max bg-red-500 text-white cursor-pointer flex items-center p-2  justify-center rounded-md">
            Thoát Nhóm
          </span>
        ) : (
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="outline-none"
          >
            <span className="text-red-600 cursor-pointer">Thoát Nhóm</span>
          </DropdownMenuItem>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc chắn muốn rời nhóm này
          </AlertDialogTitle>
          <AlertDialogDescription>
            Bạn không thể xem nhóm sau khi thực hiện hành động này
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500" onClick={handleDeleteGroup}>
            {isLeaving ? <Loader /> : "Thoát Nhóm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default LeaveGroup;