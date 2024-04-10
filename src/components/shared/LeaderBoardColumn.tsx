import { Link } from "react-router-dom";

import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "avatar",
    header: "Ảnh",
    cell: ({ row }) => (
      <Link to={`/profile/${row.original.id}`} className="hover:text-red-1">
        <img
          src={row.original.avatar}
          alt="img-profile"
          className="w-full h-full object-cover"
        />
      </Link>
    ),
  },
  {
    accessorKey: "lastName",
    header: "Họ",
  },
  {
    accessorKey: "firstName",
    header: "Tên",
  },
  {
    accessorKey: "username",
    header: "Tên người dùng",
  },
  {
    accessorKey: "a",
    header: "A",
  },
  {
    accessorKey: "b",
    header: "B",
  },
  {
    accessorKey: "c",
    header: "C",
  },
  {
    accessorKey: "d",
    header: "D",
  },
];
