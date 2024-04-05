import { IUser } from "@/types";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import * as apiClient from "./query-api";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetSuggestFriends = () => {
  const getSuggestUserRequest = async (): Promise<IUser[]> => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/api/user/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failded to get all User");

    return response.json();
  };
  const { data: suggestUsers, isLoading } = useQuery(
    "fetchAllUser",
    getSuggestUserRequest
  );

  return { suggestUsers, isLoading };
};

export const useAcceptFriend = () => {
  const token = localStorage.getItem("token");

  const acceptFriendRequest = async (acceptFriendId: string) => {
    const response = await fetch(
      `${API_BASE_URL}/api/relationship/acceptRequest/${acceptFriendId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("Failed to accept Friend");
    return await response.json();
  };

  const { mutate: acceptFriend, isLoading } = useMutation({
    mutationFn: (friendId: string) => acceptFriendRequest(friendId),
    onSuccess: () => {
      toast.success("Đã chấp nhập lơi mời");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });

  return {
    acceptFriend,
    isLoading,
  };
};

export const useSendRequestFriend = () => {
  return useMutation({
    mutationFn: (friendId: string) => apiClient.sendFriendRequest(friendId),
    onSuccess: (data) => {
      toast.success("Gửi lời mời thành công");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });
};
