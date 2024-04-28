import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { NotificationType } from "@/types";
import { Link } from "react-router-dom";
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
                <div className="flex flex-col gap-3">
                  {notifications.map((notification: NotificationType) => (
                    <Link
                      key={notification.id}
                      to={`${
                        notification.notificationType.name === "Friend"
                          ? "/profile/" + notification.actor?.id
                          : `/post/${notification?.post}`
                      }`}
                      className="flex items-center gap-2 bg-blue-2 p-3 rounded-lg"
                    >
                      <img
                        className="profile-photo"
                        src={notification.owner.avatar || "/person.jpg"}
                        alt="profileImage"
                      />
                      <div>
                        <p className="text-base-medium">
                          {notification.content}
                        </p>
                        <span>
                          {multiFormatDateString(
                            notification.createDate.toString()
                          )}
                        </span>
                      </div>
                    </Link>
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
