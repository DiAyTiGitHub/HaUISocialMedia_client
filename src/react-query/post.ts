import { CreatePostType } from "@/pages/PostForm";
import { useMutation, useQuery } from "react-query";
import * as apiClient from "./query-api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const useCreatePost = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (PostForm: CreatePostType) => apiClient.createPost(PostForm),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Đã tạo bài viết");
      navigate("/");
      window.location.href = "/";
    },
    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });
};
export const useGetPostById = (postId: string) => {
  return useQuery({
    queryKey: "getPostById",
    queryFn: () => apiClient.getPostById(postId),
    enabled: !!postId,
  });
};

export const useUpdatePost = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (postData: any) => apiClient.updatePost(postData),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Đã cập nhật bài viết");
      navigate("/");
      window.location.href = "/";
    },
    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });
};
export const useDeletePost = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (postId: string) => apiClient.deletePost(postId),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Đã xoá bài viết");
      navigate("/");
      window.location.href = "/";
    },
    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });
};

export const useLikePost = () => {
  return useMutation({
    mutationFn: (postId: string) => apiClient.likePost(postId),
    onSuccess: () => {
      console.log("da like");
    },
  });
};

export const useDislikePost = () => {
  return useMutation({
    mutationFn: (postId: string) => apiClient.dislikePost(postId),
    onSuccess: () => {
      console.log("huy like");
    },
  });
};
