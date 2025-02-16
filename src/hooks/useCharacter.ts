import { Character } from "../models/Character";
import { useRequest } from "./useRequest";

export const useCharacter = (id: string) => {
  const { data, isPending, error } = useRequest<Character>(`/character/${id}`);
  return { character: data, loading: isPending, error };
};
