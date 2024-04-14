import { useQuery } from "react-query";
import * as apiClient from "./query-api";

export const useGetAllJoinedRooms = () => {
  return useQuery({
    queryKey: "getAllJoinedRooms",
    queryFn: () => apiClient.getAllJoinedRooms(),
  });
};
export const useGetChatById = (chatId: string) => {
  return useQuery({
    queryKey: "getChatId",
    queryFn: () => apiClient.getChatById(chatId),
    enabled: !!chatId,
  });
};
