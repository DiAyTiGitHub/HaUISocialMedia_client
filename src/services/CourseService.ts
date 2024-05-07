import ConstantList from "@/appConfig";
import httpService from "./HttpService";

const API_PATH = ConstantList.API_ENPOINT + "/api/course";
const _axios = httpService.getAxiosClient();

export function getAllCourseRequest() {
  const url = API_PATH + "/all";
  return _axios.get(url);
}
export function createCourseRequest(formData: any) {
  const url = API_PATH + "/add";
  return _axios.post(url, formData);
}
export function pagingCourseRequest(searchObject: any) {
  const url = API_PATH + `/paging`;
  return _axios.post(url, searchObject);
}
export function updateCourseRequest(formData: any) {
  const url = API_PATH + "/update";
  return _axios.put(url, formData);
}
export function deleteCourseRequest(classId: string) {
  const url = API_PATH + `/delete/${classId}`;
  return _axios.delete(url);
}