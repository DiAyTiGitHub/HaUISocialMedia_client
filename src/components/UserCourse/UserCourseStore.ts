import {
  createUserCourseRequest,
  getAllCourseAdminAllowRequest,
} from "@/services/UserCourseService";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class UserCourseStore {
  constructor() {
    makeAutoObservable(this);
  }

  createUserCourse = async (formData: any) => {
    try {
      const { data } = await createUserCourseRequest(formData);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
  getAllCourseAdminAllow = async (userId: string) => {
    try {
      const { data } = await getAllCourseAdminAllowRequest(userId);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
}

export default UserCourseStore;
