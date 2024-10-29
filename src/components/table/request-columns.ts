import { ColumnDef } from "@tanstack/react-table";
import { RequestDocument } from "@/models/Request";
import { Tabs, useTabs } from "@/stores/sidebar-store";

export const requestColumns: ColumnDef<RequestDocument>[] = [
  {
    accessorKey: "_id",
    header: "Request ID",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "userId",
    header: "User ID",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "seedType",
    header: "Seed Type",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: (info) => new Date(info.getValue() as string).toLocaleString(),
  },
];
