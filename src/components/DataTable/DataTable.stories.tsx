import type { Meta, StoryObj } from "@storybook/react";
import DataTable, { Column } from "./DataTable";

interface Person {
  id: number;
  name: string;
  age: number;
  email: string;
}

const columns: Column<Person>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
];

const data: Person[] = [
  { id: 1, name: "Alice Johnson", age: 28, email: "alice@example.com" },
  { id: 2, name: "Bob Smith", age: 34, email: "bob@example.com" },
  { id: 3, name: "Charlie Brown", age: 22, email: "charlie@example.com" },
];

const meta: Meta<typeof DataTable<Person>> = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataTable<Person>>;

export const Default: Story = {
  args: {
    data,
    columns,
  },
};

export const Sortable: Story = {
  args: {
    data,
    columns,
  },
};

export const Selectable: Story = {
  args: {
    data,
    columns,
    selectable: true,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
    emptyText: "No records found",
  },
};
