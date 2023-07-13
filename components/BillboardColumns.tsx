"use client"

import { ColumnDef } from "@tanstack/react-table"

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
]
