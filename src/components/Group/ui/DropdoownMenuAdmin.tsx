import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import DeleteGroup from "./DeleteGroup";
import UpdateGroup from "./UpdateGroup";
type Props = {
  group: any;
};
const DropdoownMenuAdmin = ({ group }: Props) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="border-none bg-slate-200 outline-none h-full w-full p-2 rounded-md">
          <ChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-none">
          <DeleteGroup id={group?.id} />
          <DropdownMenuSeparator />
          <UpdateGroup group={group} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdoownMenuAdmin;
