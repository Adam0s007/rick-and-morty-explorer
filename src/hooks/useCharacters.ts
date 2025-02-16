import { Character } from "../models/Character";
import { useRequest } from "./useRequest";

interface UseCharactersParams {
  page: number;
  status: string;
}

interface CharactersResponse {
  info: {
    pages: number;
    count: number;
    next: string;
    prev: string;
  };
  results: Character[];
}

export const useCharacters = ({ page, status }: UseCharactersParams) => {
  const endpoint = `/character?page=${page}${
    status ? `&status=${status}` : ""
  }`;
  const { data, isPending, error } = useRequest<CharactersResponse>(endpoint);

  return {
    characters: data?.results || [],
    totalPages: data?.info.pages || 1,
    loading: isPending,
    error,
  };
};
