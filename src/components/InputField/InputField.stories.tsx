import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["outlined", "filled", "ghost"],
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    type: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your name",
    helperText: "This is a helper text",
    variant: "outlined",
    size: "md",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    errorMessage: "Invalid email format",
    variant: "outlined",
    size: "md",
  },
};

export const PasswordField: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    passwordToggle: true,
    helperText: "Click the eye to toggle visibility",
  },
};

export const ClearableField: Story = {
  args: {
    label: "Search",
    placeholder: "Type something...",
    clearable: true,
    value: "Hello",
  },
};

export const LoadingState: Story = {
  args: {
    label: "Username",
    placeholder: "Loading input...",
    loading: true,
  },
};

export const Variants: Story = {
  args: {
    label: "Outlined Input",
    placeholder: "Type here",
    variant: "outlined",
  },
  render: (args) => (
    <div className="space-y-4">
      <InputField {...args} label="Outlined" variant="outlined" />
      <InputField {...args} label="Filled" variant="filled" />
      <InputField {...args} label="Ghost" variant="ghost" />
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    placeholder: "Type here",
  },
  render: (args) => (
    <div className="space-y-4">
      <InputField {...args} label="Small" size="sm" />
      <InputField {...args} label="Medium" size="md" />
      <InputField {...args} label="Large" size="lg" />
    </div>
  ),
};
