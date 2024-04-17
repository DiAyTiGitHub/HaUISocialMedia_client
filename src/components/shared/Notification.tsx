import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import * as apiClient from "@/react-query/query-api";
import { NotificationType } from "@/types";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { multiFormatDateString } from "@/lib/utils";

const Notification = () => {
  const { ref, inView } = useInView();
  const [showLoadMore, setShowLoadMore] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const [paging, setPaging] = useState({
    pageIndex: 1,
    pageSize: 10,
  });

  const mutation = useMutation(apiClient.getAllNotification, {
    onSuccess: async (data: any) => {
      if (data && data.length > 0) {
        setPaging({
          pageSize: paging.pageSize,
          pageIndex: paging.pageIndex + 1,
        });
        setNotifications((prev) => [...prev, ...data]);
      } else {
        if (!data || data.length === 0 || data.length < paging.pageSize)
          setShowLoadMore(false);
      }
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });
  const handleGetData = (pagination: any) => {
    mutation.mutate(pagination);
  };

  useEffect(() => {
    if (inView) handleGetData(paging);
  }, [inView, paging]);

  return (
    <Popover>
      <PopoverTrigger>
        {" "}
        <Bell className="hover:text-primary" />
      </PopoverTrigger>
      <PopoverContent className="min-w-[350px] mt-3 relative right-1/3 max-h-[70vh] overflow-y-auto border-none bg-white">
        <div>
          <p className="text-lg mb-2 font-bold">Thông báo</p>
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
                    <p className="text-base-medium">{notification.content}</p>
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
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
