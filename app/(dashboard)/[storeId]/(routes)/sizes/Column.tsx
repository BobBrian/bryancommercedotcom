"use client"
import { ColumnDef } from "@tanstack/react-table"
import { CellActions } from "./CellActions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SizeColumn = {
  id: string
  name: string
  value:string
  createdAt: string
}

export const Columns: ColumnDef<SizeColumn>[] = [
    {
      accessorKey: "label",
      header: "Label",
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