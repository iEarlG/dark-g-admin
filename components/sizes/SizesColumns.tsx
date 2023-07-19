"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "@/components/sizes/CellAction";

export type SizeClmns = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
}

export const columns: ColumnDef<SizeClmns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  }
]
