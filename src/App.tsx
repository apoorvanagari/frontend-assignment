import { useState } from "react";
import { InputField } from "./components/InputField/InputField";
import { DataTable, Column } from "./components/DataTable/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const initial: User[] = [
  { id: 1, name: "Aditi Sharma", email: "aditi@example.com", age: 28 },
  { id: 2, name: "Ravi Verma", email: "ravi@example.com", age: 34 },
  { id: 3, name: "Lisha Gupta", email: "lisha@example.com", age: 24 },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

export default function App() {
  const [value, setValue] = useState("");
  const [data, setData] = useState<User[]>(initial);

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">Frontend Assignment</h1>
        <p className="text-muted">
          Reusable InputField and DataTable components
        </p>
      </div>

      {/* Input Section */}
      <div className="card shadow-sm mb-5">
        <div className="card-body">
          <h2 className="h4 mb-4">Input Fields</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <InputField
                label="Search Users"
                placeholder="Type a name…"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                helperText="Try typing: Aditi, Ravi, Lisha"
                variant="outlined"
                size="lg"
              />
            </div>
            <div className="col-md-6">
              <InputField
                label="Password"
                placeholder="Enter your password"
                variant="filled"
                size="lg"
                type="password"
                passwordToggle
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h4 mb-0">User Data Table</h2>
            <button
              className="btn btn-danger"
              onClick={() => setData([])}
            >
              Clear Data
            </button>
          </div>

          <DataTable
            data={data.filter((u) =>
              u.name.toLowerCase().includes(value.toLowerCase())
            )}
            columns={columns}
            selectable
            onRowSelect={(rows) => console.log("Selected:", rows)}
          />
        </div>
      </div>
    </div>
  );
}
