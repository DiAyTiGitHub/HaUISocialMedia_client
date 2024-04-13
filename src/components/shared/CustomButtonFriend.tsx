import { useState } from "react";
import { Button } from "../ui/button";

type CustomButtonFriendProps = {
  title: string;
  titleDisable: string;
  handleFn: (id: string) => void;
  isLoading: boolean;
  id?: string;
};

const CustomButtonFriend = ({
  title,
  titleDisable,
  handleFn,
  isLoading,
  id,
}: CustomButtonFriendProps) => {
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const handdleClick = async () => {
    try {
      await handleFn(id || "");
      setIsDisable(true);
    } catch (error) {
      console.log(error);
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
      onClick={handdleClick}
    >
      {isLoading && "Đang..."}
      {isDisable ? titleDisable : title}
    </Button>
  );
};

export default CustomButtonFriend;
