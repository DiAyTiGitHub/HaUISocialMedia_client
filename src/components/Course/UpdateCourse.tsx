import CourseForm from "./CourseForm";

type Props = {
  classData: any;
};
const UpdateCourse = ({ classData }: Props) => {
  return (
    <CourseForm title="Cập nhật môn học" isUpdate classData={classData}>
      <span className="text-yellow-600 cursor-pointer">Cập nhật</span>
    </CourseForm>
  );
};

export default UpdateCourse;
