import { ReactNode, memo, useState } from "react";

import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { observer } from "mobx-react";
import { Button } from "@/components/ui/button";

type CustomButtonFriendProps = {
  message: string;
  handleFn: any;
  id?: string;
  children: ReactNode;
  style: string;
  variant?: "default" | "outline";
};

const CustomButtonGroup = ({
  message,
  handleFn,
  id,
  style,
  children,
  variant,
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
      variant={variant || "default"}
      disabled={isDisable}
      className={style}
      onClick={(e: any) => handleClick(e)}
    >
      {isLoading && <Loader />}
      {children}
    </Button>
  );
};

export default memo(observer(CustomButtonGroup));
