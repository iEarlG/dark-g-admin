"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "@/components/CellAction";

export type BillboardClmns = {
  id: string;
  label: string;
  createdAt: string;
}

export const columns: ColumnDef<BillboardClmns>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  }
]
