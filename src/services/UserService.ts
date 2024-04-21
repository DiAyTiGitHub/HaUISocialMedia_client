import ConstantList from "@/appConfig";
import HttpService from "./HttpService";

const axios = HttpService.getAxiosClient();
const API_PATH = ConstantList.API_ENPOINT + "/api/user";

export function getCurrentLoginUser() {
  const url = API_PATH;
  return axios.get(url);
}

export function pagingSuggestFriend(searchObject: any) {
  const url = API_PATH + "/pagingNewUser";
  return axios.post(url, searchObject);
}

export function getUserByIdRequest(userId: string) {
  const url = API_PATH + `/${userId}`;
  return axios.get(url);
}

export function updateUserRequest(data: any) {
  const url = API_PATH + "/update";
  return axios.put(url, data);
}
