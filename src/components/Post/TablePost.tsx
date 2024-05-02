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
import DeletePost from "./DeletePost";

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
  postData: any;
  isLoading: boolean;
};
const TablePost = ({ postData, isLoading }: Props) => {
  const handleDelete = (): boolean => true;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Mã bài đăng</TableHead>
          <TableHead>ngày đăng</TableHead>
          <TableHead>Nội dung</TableHead>
          <TableHead>Thông tin người tạo</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <>
        {!postData ? (
          <span>Chưa có Bài đăng nào</span>
        ) : (
          <TableBody>
            likes: [];
            {postData.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.code}</TableCell>
                <TableCell>{item.createDate}</TableCell>
                <TableCell>{item.content}</TableCell>
                <TableCell>{item.creator}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-5 justify-end">
                    <DeletePost id={item.id} />
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

export default TablePost;
