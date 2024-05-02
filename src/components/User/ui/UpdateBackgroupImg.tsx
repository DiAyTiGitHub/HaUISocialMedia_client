import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UpdateBackgroundImgForm from "./UpdateBackgroundImgForm";

type Props = {
  backgroundImg: any;
};
const UpdateBackgroupImg = ({ backgroundImg }: Props) => {
  return (
    <Dialog>
      <DialogTrigger className="outline-none">
        <p className="small-medium text-black bg-slate-400 px-10 py-3 rounded-lg">
          Cập nhật ảnh bìa
        </p>
      </DialogTrigger>
      <DialogContent className="mt-10 max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cập nhật ảnh bìa</DialogTitle>
        </DialogHeader>
        <UpdateBackgroundImgForm backgroundImg={backgroundImg} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBackgroupImg;
