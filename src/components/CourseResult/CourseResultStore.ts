import { getAllCourseResultRequest } from "@/services/CourseResultServive";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class CourseResultStore {
  constructor() {
    makeAutoObservable(this);
  }

  getAllCourseResult = async () => {
    try {
      const { data } = await getAllCourseResultRequest();
      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };
}

export default CourseResultStore;
