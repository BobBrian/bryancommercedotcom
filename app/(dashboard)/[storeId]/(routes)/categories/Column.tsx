"use client"
import { ColumnDef } from "@tanstack/react-table"
import { CellActions } from "./CellActions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
  id: string
  name: string
  billboardLabel:string
  createdAt: string
  
}

export const Columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "categories",
    header: "Category",
    cell: ({row}) => row.original.billboardLabel
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({row}) => <CellActions data={row.original}/>
  }
]