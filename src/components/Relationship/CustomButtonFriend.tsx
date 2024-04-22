import { memo, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { observer } from "mobx-react";

type CustomButtonFriendProps = {
  title: string;
  message: string;
  handleFn: any;
  id?: string;
};

const CustomButtonFriend = ({
  title,
  message,
  handleFn,
  id,
}: CustomButtonFriendProps) => {
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClick = async (e: MouseEvent) => {
    const button = e.target as HTMLButtonElement;
    e.preventDefault();
    setIsLoading(true);
    try {
      await handleFn(id || "");
      setIsDisable(true);
      toast.success(message);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      disabled={isDisable}
      className={`${
        title === "Từ chối"
          ? "bg-white text-black hover:bg-grey-2"
          : "bg-blue-600 hover:bg-blue-500"
      }`}
      onClick={(e: any) => handleClick(e)}
    >
      {isLoading && <Loader />}
      {isDisable ? message : title}
    </Button>
  );
};

export default memo(observer(CustomButtonFriend));
