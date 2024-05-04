import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  // TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import UpdateClass from "./UpdateStatusUser";
type Props = {
  userData: any;
  isLoading: boolean;
};
const TableUser = ({ userData, isLoading }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Mã User</TableHead>
          <TableHead>username </TableHead>
          <TableHead>Họ </TableHead>
          <TableHead>Tên </TableHead>
          <TableHead>email </TableHead>
          <TableHead>Địa chỉ </TableHead>
          <TableHead>Giới tính</TableHead>
          <TableHead>Ngày sinh</TableHead>
        </TableRow>
      </TableHeader>
      <>
        {!userData ? (
          <span>Chưa có tài khoản nào được tạo</span>
        ) : (
          <TableBody>
            {userData.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.gender ? "Nam" : "Nữ"}</TableCell>
                <TableCell>{item.birthDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </>
    </Table>
  );
};

export default TableUser;
