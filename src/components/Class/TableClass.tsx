import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteClass from "./DeleteClass";
import ListStudent from "./ListStudent";
import UpdateClass from "./UpdateClass";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];
type Props = {
  classData: any;
  isLoading: boolean;
};
const TableClass = ({ classData, isLoading }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Mã Lớp</TableHead>
          <TableHead>Tên Lớp</TableHead>
          <TableHead>Mô Tả</TableHead>
          <TableHead className="text-center">Sinh Viên</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <>
        {!classData ? (
          <span>Chưa có lơp học nào</span>
        ) : (
          <TableBody>
            {classData.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.code}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell className="text-center">
                  {item.students ? item.students.lenght : 0}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-5 justify-end">
                    <UpdateClass classData={item} />
                    <DeleteClass id={item.id} />
                    <ListStudent students={item?.students} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </>
    </Table>
  );
};

export default TableClass;
