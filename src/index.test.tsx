import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { ReactMultiSelect } from "./Index";

it("renders React Multi Select", (): void => {
  render(<ReactMultiSelect options={[]} />);

  expect(screen.getByRole("textbox")).toBeInTheDocument();
});

it("renders loading spinner", (): void => {
  render(<ReactMultiSelect options={[]} loading={true} />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

it("shows array options when clicking on input field", (): void => {
  render(<ReactMultiSelect options={["option 1", "option 2"]} />);

  userEvent.click(screen.getByRole("textbox"));

  expect(screen.getAllByRole("listitem").length).toEqual(2);
  expect(screen.getByText("option 1")).toBeInTheDocument();
  expect(screen.getByText("option 2")).toBeInTheDocument();
});

it("shows object options when clicking on input field", (): void => {
  render(<ReactMultiSelect options={[{ id: 1, name: "option 1"}, { id: 2, name: "option 2"}]} optionKey="id" />);

  userEvent.click(screen.getByRole("textbox"));

  expect(screen.getAllByRole("listitem").length).toEqual(2);
  expect(screen.getByText("1")).toBeInTheDocument();
  expect(screen.getByText("2")).toBeInTheDocument();
});

it("hides options when clicking on input field then blurring", async (): Promise<void> => {
  render(<ReactMultiSelect options={["option 1", "option 2"]} />);

  userEvent.click(screen.getByRole("textbox"));
  userEvent.click(document.body);

  await waitFor(() => expect(screen.queryByRole("list")).not.toBeInTheDocument());
});

it("selects array option", (): void => {
  render(<ReactMultiSelect options={["option 1", "option 2"]} />);

  userEvent.click(screen.getByRole("textbox"));
  userEvent.click(screen.getAllByRole("listitem")[0]);

  expect(screen.getAllByRole("listitem").length).toEqual(1);
  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getByText("option 1")).toBeInTheDocument();
});

it("selects object option", (): void => {
  render(<ReactMultiSelect options={[{ id: 1, name: "option 1"}, { id: 2, name: "option 2"}]} optionKey="id" />);

  userEvent.click(screen.getByRole("textbox"));
  userEvent.click(screen.getAllByRole("listitem")[0]);

  expect(screen.getAllByRole("listitem").length).toEqual(1);
  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getByText("1")).toBeInTheDocument();
});

it("calls on change callback when selected options are changed", (): void => {
  const props = {options: ["option 1", "option 2"], onChange: jest.fn()};
  const spy = jest.spyOn(props, "onChange");

  render(<ReactMultiSelect {...props} />);

  userEvent.click(screen.getByRole("textbox"));
  userEvent.click(screen.getAllByRole("listitem")[0]);

  expect(spy).toBeCalledWith(["option 1"]);
});

it("deselects option", (): void => {
  render(<ReactMultiSelect options={["option 1", "option 2"]} />);

  userEvent.click(screen.getByRole("textbox"));
  userEvent.click(screen.getAllByRole("listitem")[0]);
  userEvent.click(screen.getByRole("button"));

  expect(screen.getAllByRole("listitem").length).toEqual(2);
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
});

it("shows options based on search", (): void => {
  render(<ReactMultiSelect options={["option 1", "option 2"]} />);

  userEvent.click(screen.getByRole("textbox"));
  userEvent.type(screen.getByRole("textbox"), "option 2");

  expect(screen.getAllByRole("listitem").length).toEqual(1);
  expect(screen.queryByText("option 1")).not.toBeInTheDocument();
});

it("shows options based on case sensitive search", (): void => {
  render(<ReactMultiSelect options={["Option 1", "option 2"]} caseSensitiveSearch={true} />);

  userEvent.click(screen.getByRole("textbox"));
  userEvent.type(screen.getByRole("textbox"), "Option");

  expect(screen.getAllByRole("listitem").length).toEqual(1);
  expect(screen.queryByText("option 2")).not.toBeInTheDocument();
});

it("disabled input box when selection limit is reached", (): void => {
  render(<ReactMultiSelect options={["option 1", "option 2"]} selectionLimit={1} />);

  userEvent.click(screen.getByRole("textbox"));
  userEvent.click(screen.getAllByRole("listitem")[0]);

  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
});

it("shows input box as disabled when passed through props", (): void => {
  render(<ReactMultiSelect options={["option 1", "option 2"]} disabled={true} />);

  expect(screen.getByRole("textbox")).toBeDisabled();
});

it("shows defined placeholder text", (): void => {
  render(<ReactMultiSelect options={["option 1", "option 2"]} placeholderText="Test placeholder text" />);

  expect(screen.getByPlaceholderText("Test placeholder text")).toBeInTheDocument();
});

it("shows defined no options text", (): void => {
  render(<ReactMultiSelect options={[]} noOptionsText="Test no options text" />);

  userEvent.click(screen.getByRole("textbox"));

  expect(screen.getByText("Test no options text")).toBeInTheDocument();
});
