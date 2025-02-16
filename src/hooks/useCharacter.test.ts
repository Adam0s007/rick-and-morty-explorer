import { renderHook, waitFor } from "@testing-library/react";
import { useCharacter } from "./useCharacter";
import { Character } from "../models/Character";

const BASE_URL = "https://rickandmortyapi.com/api";

const mockCharacter: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "", url: "" },
  location: { name: "", url: "" },
  image: "",
  episode: [],
  url: "",
  created: "",
};

describe("useCharacter", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should fetch character by id", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCharacter),
    } as Response);

    const { result } = renderHook(() => useCharacter("1"));

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/character/1`),
    );
    await waitFor(() =>
      expect(result.current.character).toEqual(mockCharacter),
    );
    await waitFor(() => expect(result.current.loading).toBe(false));
    await waitFor(() => expect(result.current.error).toBe(""));
  });

  it("should handle error when fetching character", async () => {
    const errorMessage = "Character not found";
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: errorMessage }),
    } as Response);

    const { result } = renderHook(() => useCharacter("999"));

    await waitFor(() => expect(result.current.character).toBeNull());
    await waitFor(() => expect(result.current.error).toBe(errorMessage));
    await waitFor(() => expect(result.current.loading).toBe(false));
  });
});
