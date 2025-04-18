import { useEffect, useState } from "react";
import "./App.css";
import DynamicTable from "./components/table/DynamicTable";
import { GetMethodAPI, PutMethodAPI } from "./api/dataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Button } from "./components/ui/button";

function App() {
  const [columns, setColumns] = useState<any[]>([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = async () => {
    const res = await GetMethodAPI({
      endpoint: "/fetch/users",
      loading: setLoading,
    });
    if (res) {
      setRows(res);
      fetchColumns("6801385e15b682b718300210");
    }
  };

  const fetchColumns = async (clientId: string) => {
    const res = await GetMethodAPI({
      endpoint: "/fetch/columns/" + clientId,
      loading: setLoading,
    });

    if (res?.columns) {
      setColumns(res.columns);
    }
  };

  const updateColumns = async (clientId: string, updatedCols: any[]) => {
    const res = await PutMethodAPI({
      endpoint: "/update/columns/" + clientId,
      payload: { columns: updatedCols },
      loading: setLoading,
    });
    if (res) {
      setColumns(res.columns?.columns);
    }
  };

  const handleColumnToggle = (name: string, checked: boolean) => {
    const updatedColumns = columns.map((col) =>
      col.name === name ? { ...col, required: checked } : col
    );

    setColumns(updatedColumns);
    updateColumns("6801385e15b682b718300210", updatedColumns);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-3 w-full h-svh flex items-center gap-5 flex-col">
      <h1 className="text-3xl font-bold">Custom Table</h1>
      <div className="w-full flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Select Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Select Columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {columns.map((col) => (
              <div
                key={col.name}
                className="flex items-center px-2 py-1.5 space-x-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleColumnToggle(col.name, !col.required);
                }}
              >
                <input
                  type="checkbox"
                  checked={col.required}
                  onChange={() => {}}
                  className="accent-blue-950"
                />
                <label className="text-sm">{col.label}</label>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {loading && (
        <h1 className="text-xl text-red-400 font-bold">
          Loading, please wait...
        </h1>
      )}

      {!loading && columns.length > 0 && rows.length > 0 && (
        <DynamicTable columns={columns} rows={rows} />
      )}
    </div>
  );
}

export default App;
