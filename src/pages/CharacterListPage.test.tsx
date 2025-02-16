import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import CharacterListPage from "./CharacterListPage";
import { useCharacters } from "../hooks/useCharacters";
import { ROUTES } from "../config/routes";

jest.mock("../hooks/useCharacters");

jest.mock("../components/CharacterList", () => (props: any) => (
  <div data-testid="character-list-mock">
    {props.loading
      ? "Loading..."
      : props.error
        ? props.error
        : "Character List"}
  </div>
));
jest.mock("../components/FilterDropdown", () => (props: any) => (
  <div data-testid="filter-dropdown-mock">
    <button
      data-testid="filter-change-button"
      onClick={() => props.onFilterChange({} as any, { value: "alive" })}
    >
      Change Filter
    </button>
  </div>
));
jest.mock("../components/PaginationControls", () => (props: any) => (
  <div data-testid="pagination-controls-mock">
    <span>
      Page {props.currentPage} of {props.totalPages}
    </span>
    <button data-testid="prev-button" onClick={props.onPrevPage}>
      Prev
    </button>
    <button data-testid="next-button" onClick={props.onNextPage}>
      Next
    </button>
  </div>
));

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.search}</div>;
};
describe("CharacterListPage", () => {
  const fakeCharactersData = {
    characters: [{ id: 1, name: "Rick Sanchez" }],
    totalPages: 5,
    loading: false,
    error: null,
  };

  const renderPage = (initialPath = ROUTES.CHARACTERS + "?page=2&status=") => {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route
            path="*"
            element={
              <>
                <CharacterListPage />
                <LocationDisplay />
              </>
            }
          />
        </Routes>
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
    (useCharacters as jest.Mock).mockReturnValue(fakeCharactersData);
  });

  it("renders the page with initial search params", () => {
    renderPage(ROUTES.CHARACTERS + "?page=2&status=");

    expect(screen.getByTestId("pagination-controls-mock")).toHaveTextContent(
      "Page 2 of 5",
    );
    expect(screen.getByTestId("filter-dropdown-mock")).toBeInTheDocument();
    expect(screen.getByTestId("character-list-mock")).toHaveTextContent(
      "Character List",
    );
  });

  it("resets currentPage to 1 when filter is changed", async () => {
    renderPage(ROUTES.CHARACTERS + "?page=3&status=");

    expect(screen.getByTestId("pagination-controls-mock")).toHaveTextContent(
      "Page 3 of 5",
    );

    fireEvent.click(screen.getByTestId("filter-change-button"));

    await waitFor(() => {
      expect(screen.getByTestId("pagination-controls-mock")).toHaveTextContent(
        "Page 1 of 5",
      );
    });
  });

  it("handles pagination controls correctly", async () => {
    renderPage(ROUTES.CHARACTERS + "?page=2&status=");
    const pagination = screen.getByTestId("pagination-controls-mock");

    expect(pagination).toHaveTextContent("Page 2 of 5");

    fireEvent.click(screen.getByTestId("next-button"));
    await waitFor(() => {
      expect(screen.getByTestId("pagination-controls-mock")).toHaveTextContent(
        "Page 3 of 5",
      );
    });

    fireEvent.click(screen.getByTestId("prev-button"));
    await waitFor(() => {
      expect(screen.getByTestId("pagination-controls-mock")).toHaveTextContent(
        "Page 2 of 5",
      );
    });
  });

  it("updates URL search params when page or filter changes", async () => {
    renderPage(ROUTES.CHARACTERS + "?page=4&status=");

    expect(screen.getByTestId("pagination-controls-mock")).toHaveTextContent(
      "Page 4 of 5",
    );

    fireEvent.click(screen.getByTestId("next-button"));
    await waitFor(() => {
      expect(screen.getByTestId("pagination-controls-mock")).toHaveTextContent(
        "Page 5 of 5",
      );
    });

    fireEvent.click(screen.getByTestId("filter-change-button"));
    await waitFor(() => {
      expect(screen.getByTestId("pagination-controls-mock")).toHaveTextContent(
        "Page 1 of 5",
      );
    });

    const locationDisplay = screen.getByTestId("location-display");
    expect(locationDisplay.textContent).toContain("page=1");
    expect(locationDisplay.textContent).toContain("status=alive");
  });
});
