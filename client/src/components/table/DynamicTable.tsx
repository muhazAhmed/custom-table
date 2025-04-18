import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DynamicTableProps } from "@/lib/props";
import { FC } from "react";

const DynamicTable: FC<DynamicTableProps> = ({
  columns,
  rows,
  tableCaption,
  TableFooter,
  tableClassName,
  tableHeaderClassName,
  tableBodyClassName,
}) => {
  console.log(columns);
  return (
    <Table className={tableClassName}>
      {tableCaption && <TableCaption>{tableCaption}</TableCaption>}

      <TableHeader className={tableHeaderClassName}>
        <TableRow>
          {columns?.map((item) =>
            item?.required ? (
              <TableHead key={item?.name}>{item?.label}</TableHead>
            ) : null
          )}
        </TableRow>
      </TableHeader>

      <TableBody className={tableBodyClassName}>
        {rows.map((row, rowIndex) => (
          <TableRow key={row?.id || rowIndex}>
            {columns.map((col, colIndex) =>
              col?.required ? (
                <TableCell key={colIndex}>{row[col.name]}</TableCell>
              ) : null
            )}
          </TableRow>
        ))}
      </TableBody>

      {TableFooter}
    </Table>
  );
};

export default DynamicTable;
