import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterDropdown from "./FilterDropdown";

describe("FilterDropdown", () => {
  const onFilterChange = jest.fn();

  beforeEach(() => {
    onFilterChange.mockClear();
  });

  it("renders with the correct placeholder when no value is selected", () => {
    render(<FilterDropdown statusFilter="" onFilterChange={onFilterChange} />);
    expect(screen.getByText("Filter by status")).toBeInTheDocument();
  });

  it("calls onFilterChange when an option is selected", async () => {
    render(
      <FilterDropdown statusFilter="all" onFilterChange={onFilterChange} />,
    );

    const dropdown = screen.getByRole("listbox");
    userEvent.click(dropdown);

    const deadOption = await screen.findByText("Dead");
    userEvent.click(deadOption);

    await waitFor(() => {
      expect(onFilterChange).toHaveBeenCalled();
    });
  });
});
