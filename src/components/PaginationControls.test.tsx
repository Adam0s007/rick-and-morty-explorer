import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PaginationControls from "./PaginationControls";

describe("PaginationControls", () => {
  const setup = (currentPage: number, totalPages: number) => {
    const onPrevPage = jest.fn();
    const onNextPage = jest.fn();

    render(
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
      />,
    );

    return { onPrevPage, onNextPage };
  };

  it("renders the page info correctly", () => {
    setup(2, 5);
    expect(screen.getByTestId("page-info")).toHaveTextContent("Page 2 of 5");
  });

  it("disables the previous button on the first page", () => {
    const { onPrevPage } = setup(1, 5);
    const prevButton = screen.getByTestId("prev-button");
    expect(prevButton).toBeDisabled();

    fireEvent.click(prevButton);
    expect(onPrevPage).not.toHaveBeenCalled();
  });

  it("disables the next button on the last page", () => {
    const { onNextPage } = setup(5, 5);
    const nextButton = screen.getByTestId("next-button");
    expect(nextButton).toBeDisabled();

    fireEvent.click(nextButton);
    expect(onNextPage).not.toHaveBeenCalled();
  });

  it("calls onPrevPage when the previous button is clicked (if enabled)", () => {
    const { onPrevPage } = setup(3, 5);
    const prevButton = screen.getByTestId("prev-button");
    expect(prevButton).not.toBeDisabled();

    fireEvent.click(prevButton);
    expect(onPrevPage).toHaveBeenCalledTimes(1);
  });

  it("calls onNextPage when the next button is clicked (if enabled)", () => {
    const { onNextPage } = setup(3, 5);
    const nextButton = screen.getByTestId("next-button");
    expect(nextButton).not.toBeDisabled();

    fireEvent.click(nextButton);
    expect(onNextPage).toHaveBeenCalledTimes(1);
  });
});
