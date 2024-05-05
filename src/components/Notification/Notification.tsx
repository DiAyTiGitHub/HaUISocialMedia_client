import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, Loader } from "lucide-react";
import { useState } from "react";
import { NotificationType } from "@/types";
import { useNavigate } from "react-router-dom";
import { multiFormatDateString } from "@/lib/utils";
import FriendListSkeleton from "../skeleton/FriendListSkeleton";
import { useStore } from "@/stores";
import useGetData from "@/lib";

const Notification = () => {
  const { notificationStore } = useStore();
  const { getNotification } = notificationStore;

  const [paging, setPaging] = useState({
    pageIndex: 1,
    pageSize: 10,
  });

  const {
    ref,
    res: notifications,
    isLoading,
    showLoadMore,
  } = useGetData({
    getRequest: getNotification,
    paging: paging,
    setPaging: setPaging,
  });

  const navigate = useNavigate();

  console.log(notifications);
  const handleNavigateNotification = (notify: any) => {
    let handleFn = () => {};
    switch (notify?.notificationType.name) {
      case "Group":
        handleFn = () => {
          navigate("/group/" + notify.groupDto?.id);
          window.location.href = "/group/" + notify.groupDto?.id;
        };
        break;

      case "Friend":
        handleFn = () => {
          navigate("/profile/" + notify.actor?.id);
        };
        break;

      case "Post":
        handleFn = () => {
          navigate("/post/" + notify.post?.id);
        };
        break;
      default:
        break;
    }

    return handleFn;
  };

  return (
    <Popover>
      <PopoverTrigger>
        {" "}
        <Bell className="hover:text-primary" />
      </PopoverTrigger>
      <PopoverContent className="min-w-[350px] mt-[32px] relative z-10 right-1/3 max-h-[70vh] overflow-y-auto border-none bg-white">
        <div>
          <p className="text-lg mb-2 font-bold">Thông báo</p>
          {isLoading ? (
            <FriendListSkeleton length={5} styles="flex flex-col gap-2" />
          ) : (
            <>
              {!notifications || notifications.length === 0 ? (
                <p>Không có thông báo nào</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {notifications.map((notification: NotificationType) => (
                    <div
                      onClick={handleNavigateNotification(notification)}
                      key={notification?.id}
                      className="flex items-center bg-blue-2 p-2 rounded-lg cursor-pointer"
                    >
                      <div className="profilePhotoWrapper pr-2">
                        <img
                          className="profile-photo"
                          src={notification?.actor?.avatar || "/person.jpg"}
                          alt="profileImage"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-base-medium">
                          {notification.content}
                        </p>
                        <span>
                          {multiFormatDateString(
                            notification.createDate.toString()
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {showLoadMore && (
                <div ref={ref}>
                  <Loader />
                </div>
              )}
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
