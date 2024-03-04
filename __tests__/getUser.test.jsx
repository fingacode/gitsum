import { describe, it, expect, vi } from 'vitest';
import { getUser } from '../src/app/actions';

global.fetch = vi.fn();

describe('getUser', () => {
  it('should throw an error if username is not provided', async () => {
    await expect(getUser(undefined)).rejects.toThrow('Username not provided');
  });

  it('should return null if the fetch fails', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    const result = await getUser('nonexistentuser');
    expect(result).toBeNull();
  });

  it('should return user data if the fetch request succeeds', async () => {
    const mockUserData = { id: '123', name: 'Test User' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUserData),
    });

    const result = await getUser('existentuser');
    expect(result).toEqual(mockUserData);
  });
});
