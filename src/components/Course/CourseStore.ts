import {
  getAllCourseRequest,
  createCourseRequest,
  pagingCourseRequest,
  updateCourseRequest,
  deleteCourseRequest
} from "@/services/CourseService";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class CourseStore {
  constructor() {
    makeAutoObservable(this);
  }

  getAllCourse = async () => {
    try {
      const { data } = await getAllCourseRequest();
      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };
  createCourse = async (formData: any) => {
    try {
      const { data } = await createCourseRequest(formData);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
  updateCourse = async (formData: any) => {
    try {
      const { data } = await updateCourseRequest(formData);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
  deleteCourse = async (formData: any) => {
    try {
      const { data } = await deleteCourseRequest(formData);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
  pagingCourse = async (searchObject: any) => {
    try {
      const { data } = await pagingCourseRequest(searchObject);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
}

export default CourseStore;
