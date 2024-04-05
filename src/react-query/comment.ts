import { useMutation, useQuery, useQueryClient } from "react-query";
import * as apiClient from "@/react-query/query-api";
import { CreateCommentType } from "@/components/shared/Comment";
import toast from "react-hot-toast";
export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (PostForm: CreateCommentType) =>
      apiClient.createComment(PostForm),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Đã bình luận bài viết");
      queryClient.invalidateQueries({
        queryKey: "getComment",
      });
    },
    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });
};

export const useGetComment = (postId: string) => {
  return useQuery({
    queryKey: "getComment",
    queryFn: () => apiClient.getCommentPost(postId),
    enabled: !!postId,
  });
};

export const useGetSubComment = (commentId: string) => {
  return useQuery({
    queryKey: "getSubComment",
    queryFn: () => apiClient.getSubCommentPost(commentId),
    enabled: !!commentId,
  });
};
