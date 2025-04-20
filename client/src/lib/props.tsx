export type DynamicTableProps = {
  columns: Column[];
  rows: Record<string, any>[];
  tableCaption?: string;
  TableFooter?: React.ReactNode;
  tableClassName?: string;
  tableHeaderClassName?: string;
  tableBodyClassName?: string;
};

type Column = {
  required: boolean;
  name: string;
  label: string;
};

export type apiConfigProps = {
    endpoint: string;
    payload?: Record<string, any>;
    loading: (isLoading: boolean) => void
}

export interface IModal {
  onOpenChange: (open: boolean) => void;
}