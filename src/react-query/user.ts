import { useMutation, useQuery } from "react-query";
import * as apiClient from "./query-api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useGetUseById = (userId: string) => {
  return useQuery({
    queryKey: "getUserById",
    queryFn: () => apiClient.getUserById(userId),
    enabled: !!userId,
  });
};

export const useUpdateUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (userData: any) => apiClient.updateUser(userData),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Đã cập nhật thông tin");
      navigate("/");
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = `/profile/${data.id}`;
    },
    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });
};
