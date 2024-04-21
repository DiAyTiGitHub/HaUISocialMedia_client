import ConstantList from "@/appConfig";
import httpService from "./HttpService";

const API_PATH = ConstantList.API_ENPOINT + "/api/user";
const _axios = httpService.getAxiosClient();

export function getCurrentLoginUser() {
  const url = API_PATH;
  return _axios.get(url);
}

export function pagingSuggestFriend(searchObject: any) {
  const url = API_PATH + "/pagingNewUser";
  return _axios.post(url, searchObject);
}

export function getUserByIdRequest(userId: string) {
  const url = API_PATH + `/id/${userId}`;
  return _axios.get(url);
}

export function updateUserRequest(data: any) {
  const url = API_PATH + "/update";
  return _axios.put(url, data);
}
