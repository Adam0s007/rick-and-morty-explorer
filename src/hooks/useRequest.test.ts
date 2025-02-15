import { renderHook, waitFor } from '@testing-library/react';
import { useRequest } from './useRequest';


describe('useRequest', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should fetch data successfully', async () => {
    const mockData = { name: 'Rick Sanchez' };
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response);

    const { result } = renderHook(() => useRequest<typeof mockData>('/test'));

    expect(result.current.isPending).toBe(true);

    await waitFor(() => expect(result.current.data).toEqual(mockData));
    await waitFor(() => expect(result.current.error).toBe(''));
    await waitFor(() => expect(result.current.isPending).toBe(false));
  });

  it('should handle server error', async () => {
    const errorMessage = 'Not found';
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: errorMessage }),
    } as Response);

    const { result } = renderHook(() => useRequest('/test'));

    await waitFor(() => expect(result.current.error).toBe(errorMessage));
    await waitFor(() => expect(result.current.data).toBeNull());
    await waitFor(() => expect(result.current.isPending).toBe(false));
  });

  it('should handle network error', async () => {
    const errorMessage = 'Network error';
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useRequest('/test'));

    await waitFor(() => expect(result.current.error).toBe(errorMessage));
    await waitFor(() => expect(result.current.data).toBeNull());
    await waitFor(() => expect(result.current.isPending).toBe(false));
  });
});