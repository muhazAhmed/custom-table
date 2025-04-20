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
import Login from "./login/Login";
import { deleteSessionStorage, useSessionStorage } from "./lib/utils";

function App() {
  const [columns, setColumns] = useState<any[]>([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasLoggedIn, setHasLoggedIn] = useState<boolean>(false);
  const userInfo = useSessionStorage("userInfo");

  const fetchUsers = async (id: any) => {
    const res = await GetMethodAPI({
      endpoint: "/fetch/users",
      loading: setLoading,
    });
    if (res) {
      setRows(res);
      fetchColumns(id);
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
    await PutMethodAPI({
      endpoint: "/update/columns/" + clientId,
      payload: { columns: updatedCols },
      loading: setLoading,
    });
  };

  const handleColumnToggle = (name: string) => {
    const updatedCols = columns.map((col) =>
      col.name === name ? { ...col, required: !col.required } : col
    );
    setColumns(updatedCols);
  };

  const handleLogout = () => {
    setLoading(true);
    deleteSessionStorage("userInfo");
    setColumns([]);
    setRows([]);
    setLoading(false);
    setHasLoggedIn(true);
  };

  useEffect(() => {
    if (!userInfo) {
      setHasLoggedIn(true);
    } else {
      fetchUsers(userInfo?._id);
    }
  }, [hasLoggedIn]);

  return (
    <div className="p-3 w-full h-svh flex items-center gap-5 flex-col">
      {hasLoggedIn && <Login onOpenChange={setHasLoggedIn} />}
      <h1 className="text-3xl font-bold">Custom Table</h1>
      <div className="w-full flex justify-end gap-2">
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
                  handleColumnToggle(col.name);
                }}
              >
                <input
                  type="checkbox"
                  checked={col.required}
                  onChange={() => handleColumnToggle(col.name)}
                  className="accent-blue-950"
                />
                <label className="text-sm">{col.label}</label>
              </div>
            ))}
            <DropdownMenuSeparator />
            <Button
              className="w-full"
              onClick={() => updateColumns(userInfo?._id, columns)}
            >
              Apply
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
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
