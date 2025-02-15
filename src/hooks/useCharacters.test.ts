import { renderHook, waitFor } from '@testing-library/react';
import { useCharacters } from './useCharacters';
import { Character } from '../models/Character';
const BASE_URL = 'https://rickandmortyapi.com/api';

const mockCharacters: Character[] = [
  { id: 1, name: 'Rick Sanchez' } as Character,
  { id: 2, name: 'Morty Smith' } as Character,
];

const mockResponse = {
  info: { pages: 5, count: 100, next: '', prev: '' },
  results: mockCharacters,
};

describe('useCharacters', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should fetch characters with parameters', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    const { result } = renderHook(() =>
      useCharacters({ page: 2, status: 'Alive' })
    );

    await waitFor(() => 
      expect(global.fetch).toHaveBeenCalledWith(
        `${BASE_URL}/character?page=2&status=Alive`
      )
    );
    await waitFor(() => 
      expect(result.current.characters).toEqual(mockCharacters)
    );
    await waitFor(() => 
      expect(result.current.totalPages).toBe(5)
    );
    await waitFor(() => 
      expect(result.current.loading).toBe(false)
    );
  });

  it('should return defaults on error', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: 'Server error' }),
    } as Response);

    const { result } = renderHook(() =>
      useCharacters({ page: 1, status: 'Dead' })
    );

    await waitFor(() => expect(result.current.characters).toEqual([]));
    await waitFor(() => expect(result.current.totalPages).toBe(1));
    await waitFor(() => expect(result.current.error).toBe('Server error'));
  });

  it('should refetch when parameters change', async () => {
    const mockFetch = jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ ...mockResponse, info: { pages: 10 } }),
      } as Response);

    const { result, rerender } = renderHook(
      ({ page, status }) => useCharacters({ page, status }),
      { initialProps: { page: 1, status: 'Alive' } }
    );

    await waitFor(() => expect(result.current.totalPages).toBe(5));

    rerender({ page: 2, status: 'Alive' });

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(result.current.totalPages).toBe(10));
  });
});