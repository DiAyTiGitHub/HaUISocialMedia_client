import { Button } from "../ui/button";
import ClassForm from "./ClassForm";

const CreateClass = () => {
  return (
    <ClassForm title="Tạo lớp học" isCreate>
      <Button>
        <span>Tạo lớp học</span>
      </Button>
    </ClassForm>
  );
};

export default CreateClass;
