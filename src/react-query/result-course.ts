import { CourseResultType, CourseType } from "@/types";
import { useQuery } from "react-query";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetAllCourses = () => {
  const getAllCourses = async (): Promise<CourseType[]> => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/api/course/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const body = await response.json();

    if (!response.ok) throw Error(body.message);

    return body;
  };

  return useQuery({
    queryKey: "getAllCourse",
    queryFn: () => getAllCourses(),
  });
};

export const useGetAllCourseResult = () => {
  const getAllCourseResult = async (): Promise<CourseResultType[]> => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/api/courseresult/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const body = await response.json();

    if (!response.ok) throw Error(body.message);

    return body;
  };

  return useQuery({
    queryKey: "getAllCourseResult",
    queryFn: () => getAllCourseResult(),
  });
};
