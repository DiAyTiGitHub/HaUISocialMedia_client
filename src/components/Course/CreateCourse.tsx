import { Button } from "../ui/button";
import CourseForm from "./CourseForm";

const CreateCourse = () => {
  return (
    <CourseForm title="Tạo học phần" isCreate>
      <Button>
        <span>Tạo học phần</span>
      </Button>
    </CourseForm>
  );
};

export default CreateCourse;
