import { useMemo, useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T extends Record<string, any>> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  emptyText?: string;
  className?: string;
}

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
  emptyText = "No data available",
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    const col = columns.find((c) => c.key === sortKey);
    if (!col) return data;

    const arr = [...data];
    arr.sort((a, b) => {
      const va = a[col.dataIndex];
      const vb = b[col.dataIndex];
      if (va == null && vb == null) return 0;
      if (va == null) return -1;
      if (vb == null) return 1;
      if (typeof va === "number" && typeof vb === "number") {
        return va - vb;
      }
      return String(va).localeCompare(String(vb));
    });
    return sortDir === "asc" ? arr : arr.reverse();
  }, [data, columns, sortKey, sortDir]);

  function toggleSort(key: string, sortable?: boolean) {
    if (!sortable) return;
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    }
  }

  function toggleRow(idx: number) {
    if (!selectable) return;
    const next = new Set(selected);
    if (next.has(idx)) next.delete(idx);
    else next.add(idx);
    setSelected(next);
    onRowSelect?.(Array.from(next).map((i) => sorted[i]));
  }

  function toggleAll() {
    if (!selectable) return;
    if (selected.size === sorted.length) {
      setSelected(new Set());
      onRowSelect?.([]);
    } else {
      const all = new Set(sorted.map((_, i) => i));
      setSelected(all);
      onRowSelect?.(sorted);
    }
  }

  return (
    <div
      className={cx(
        "w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white",
        className
      )}
    >
      <table
        className="w-full text-left text-sm"
        role="table"
        aria-busy={loading || undefined}
      >
        <thead className="bg-gray-50">
          <tr>
            {selectable && (
              <th className="w-10 p-3">
                <input
                  type="checkbox"
                  aria-label="Select all rows"
                  checked={selected.size === sorted.length && sorted.length > 0}
                  onChange={toggleAll}
                />
              </th>
            )}
            {columns.map((c) => (
              <th
                key={c.key}
                className={cx(
                  "p-3 font-semibold text-gray-800",
                  c.sortable && "cursor-pointer select-none"
                )}
                onClick={() => toggleSort(c.key, c.sortable)}
                scope="col"
              >
                <span className="inline-flex items-center gap-1">
                  {c.title}
                  {c.sortable && sortKey === c.key && (
                    <span aria-hidden>{sortDir === "asc" ? "▲" : "▼"}</span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="p-6 text-center text-gray-600"
              >
                Loading…
              </td>
            </tr>
          ) : sorted.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="p-6 text-center text-gray-600"
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            sorted.map((row, i) => (
              <tr
                key={i}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                {selectable && (
                  <td className="p-3">
                    <input
                      type="checkbox"
                      aria-label={`Select row ${i + 1}`}
                      checked={selected.has(i)}
                      onChange={() => toggleRow(i)}
                    />
                  </td>
                )}
                {columns.map((c) => (
                  <td key={c.key} className="p-3 text-gray-900">
                    {String(row[c.dataIndex] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
