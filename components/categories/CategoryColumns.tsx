"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "@/components/CellAction";

export type CategoryClmns = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
}

export const columns: ColumnDef<CategoryClmns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({row}) => row.original.billboardLabel,
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
