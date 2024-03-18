import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";

const Notification = () => {
  return (
    <Popover>
      <PopoverTrigger>
        {" "}
        <Bell className="hover:text-blue-600" />
      </PopoverTrigger>
      <PopoverContent className="min-w-[250px] mt-3 relative right-1/3">
        <div>
          <p className="text-lg mb-2 font-bold">Thông báo</p>
          <p>Không có thông báo nào</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
