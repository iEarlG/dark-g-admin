"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "@/components/products/CellAction";

export type ProductClmns = {
  id: string;
  name: string;
  category: string;
  price: string;
  size: string;
  color: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
}

export const columns: ColumnDef<ProductClmns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({row}) => <div className="flex items-center gap-x-2">
      {row.original.color}
      <div 
        className="h-6 w-6 border rounded-full" 
        style={{backgroundColor: row.original.color}}
      />
    </div>
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
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
