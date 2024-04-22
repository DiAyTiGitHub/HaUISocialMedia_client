import ClassForm from "./ClassForm";

type Props = {
  classData: any;
};
const UpdateClass = ({ classData }: Props) => {
  return (
    <ClassForm title="Cập nhật lớp học" isUpdate classData={classData}>
      <span className="text-yellow-600 cursor-pointer">Cập nhật</span>
    </ClassForm>
  );
};

export default UpdateClass;
