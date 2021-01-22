import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { ReactMultiSearchSelect } from "./index";

it("renders React Multi Search Select", (): void => {
  render(<ReactMultiSearchSelect options={[]} />);

  expect(screen.getByRole("textbox")).toBeInTheDocument();
});

it("renders loading spinner", (): void => {
  render(<ReactMultiSearchSelect options={[]} loading={true} />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

it("shows array options when clicking on input field", (): void => {
  render(<ReactMultiSearchSelect options={["option 1", "option 2"]} />);

  userEvent.click(screen.getByRole("textbox"));

  expect(screen.getAllByRole("listitem").length).toEqual(2);
  expect(screen.getByText("option 1")).toBeInTheDocument();
  expect(screen.getByText("option 2")).toBeInTheDocument();
});

it("shows object options when clicking on input field", (): void => {
  render(<ReactMultiSearchSelect options={[{ id: 1, name: "option 1"}, { id: 2, name: "option 2"}]} optionsObject={{key: "id", value: "name"}} />);

  userEvent.click(screen.getByRole("textbox"));

  expect(screen.getAllByRole("listitem").length).toEqual(2);
  expect(screen.getByText("option 1")).toBeInTheDocument();
  expect(screen.getByText("option 2")).toBeInTheDocument();
});

it("hides options when clicking on input field then blurring", async (): Promise<void> => {
  render(<ReactMultiSearchSelect options={["option 1", "option 2"]} />);

  userEvent.click(screen.getByRole("textbox"));
  userEvent.click(document.body);

  await waitFor(() => expect(screen.queryByRole("list")).not.toBeInTheDocument());
});

it("selects array option", (): void => {
  render(<ReactMultiSearchSelect options={["option 1", "option 2"]} />);

  userEvent.click(screen.getByRole("textbox"));
  userEvent.click(screen.getAllByRole("listitem")[0]);

  expect(screen.getAllByRole("listitem").length).toEqual(1);
  expect(screen.getByRole('button', { name: /option 1/i })).toBeInTheDocument();
});

it("selects object option", (): void => {
  render(<ReactMultiSearchSelect options={[{ id: 1, name: "option 1"}, { id: 2, name: "option 2"}]} optionsObject={{key: "id", value: "name"}} />);

  userEvent.click(screen.getByRole("textbox"));
  userEvent.click(screen.getAllByRole("listitem")[0]);

  expect(screen.getAllByRole("listitem").length).toEqual(1);
  expect(screen.getByRole('button', { name: /option 1/i })).toBeInTheDocument();
});

it("calls on change callback when selected options are changed", (): void => {
  const onChange = jest.fn();

  render(<ReactMultiSearchSelect options={["option 1", "option 2"]} onChange={onChange} />);

  userEvent.click(screen.getByRole("textbox"));
  userEvent.click(screen.getAllByRole("listitem")[0]);

  expect(onChange).toBeCalledWith(["option 1"]);
});

it("calls on change callback when selected object options are changed", (): void => {
  const onChange = jest.fn();

  render(<ReactMultiSearchSelect options={[{ id: 1, name: "option 1"}, { id: 2, name: "option 2"}]} optionsObject={{key: "id", value: "name"}} onChange={onChange} />);

  userEvent.click(screen.getByRole("textbox"));
  userEvent.click(screen.getAllByRole("listitem")[0]);

  expect(onChange).toBeCalledWith([1]);
});

it("deselects option", (): void => {
  render(<ReactMultiSearchSelect options={["option 1", "option 2"]} />);

  userEvent.click(screen.getByRole("textbox"));
  userEvent.click(screen.getAllByRole("listitem")[0]);
  userEvent.click(screen.getByRole("button"));

  expect(screen.getAllByRole("listitem").length).toEqual(2);
  expect(screen.queryByRole('button', { name: /option 1/i })).not.toBeInTheDocument();
});

it("shows options based on search", (): void => {
  render(<ReactMultiSearchSelect options={["option 1", "option 2"]} />);

  userEvent.click(screen.getByRole("textbox"));
  userEvent.type(screen.getByRole("textbox"), "option 2");

  expect(screen.getAllByRole("listitem").length).toEqual(1);
  expect(screen.queryByText("option 1")).not.toBeInTheDocument();
});

it("shows options based on case sensitive search", (): void => {
  render(<ReactMultiSearchSelect options={["Option 1", "option 2"]} caseSensitiveSearch={true} />);

  userEvent.click(screen.getByRole("textbox"));
  userEvent.type(screen.getByRole("textbox"), "Option");

  expect(screen.getAllByRole("listitem").length).toEqual(1);
  expect(screen.queryByText("option 2")).not.toBeInTheDocument();
});

it("disabled input box when selection limit is reached", (): void => {
  render(<ReactMultiSearchSelect options={["option 1", "option 2"]} selectionLimit={1} />);

  userEvent.click(screen.getByRole("textbox"));
  userEvent.click(screen.getAllByRole("listitem")[0]);

  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
});

it("shows input box as disabled when passed through props", (): void => {
  render(<ReactMultiSearchSelect options={["option 1", "option 2"]} disabled={true} />);

  expect(screen.getByRole("textbox")).toBeDisabled();
});

it("shows defined placeholder text", (): void => {
  render(<ReactMultiSearchSelect options={["option 1", "option 2"]} placeholderText="Test placeholder text" />);

  expect(screen.getByPlaceholderText("Test placeholder text")).toBeInTheDocument();
});

it("shows defined no options text", (): void => {
  render(<ReactMultiSearchSelect options={[]} noOptionsText="Test no options text" />);

  userEvent.click(screen.getByRole("textbox"));

  expect(screen.getByText("Test no options text")).toBeInTheDocument();
});

it("shows default array option", (): void => {
  render(<ReactMultiSearchSelect options={["option 1", "option 2"]} defaultValues={["option 1"]} />);

  expect(screen.getByRole('button', { name: /option 1/i })).toBeInTheDocument();
});

it("shows default object option", (): void => {
  render(<ReactMultiSearchSelect options={[{ id: 1, name: "option 1"}, { id: 2, name: "option 2"}]} optionsObject={{key: "id", value: "name"}} defaultValues={[2]} />);

  expect(screen.getByRole('button', { name: /option 2/i })).toBeInTheDocument();
});
