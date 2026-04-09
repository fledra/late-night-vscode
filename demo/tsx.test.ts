import { describe, it, expect, vi } from 'vitest';
import type { User, ThemeType } from './types';
import { UserProfile } from './UserProfile';

// 1. Interface & Generic Type Testing
interface TestConfig<T extends object> {
  data: T;
  mode: ThemeType;
  retries?: number;
}

const mockUser: User = {
  id: 101,
  name: 'Dev_Tester',
  preferences: { color: 'blue' }
};

describe('UserProfile Logic', () => {
  // 2. TypeScript specific syntax (as const, Partial)
  const config: TestConfig<User> = {
    data: mockUser,
    mode: 'dark' as const,
  };

  it('correctly calculates user permissions', async () => {
    // 3. Mocking with vi (Vitest/Jest)
    const mockFetcher = vi.fn().mockResolvedValue({ status: 'active' });

    // 4. TSX Syntax with Type Casting
    const Component = (
      <UserProfile
        user={mockUser}
        isAdmin={false}
        onUpdate={mockFetcher}
      />
    );

    // 5. Logical Nullish Coalescing and Optional Chaining
    const userName = mockUser.name ?? 'Guest';
    const firstPref = mockUser.preferences?.color;

    expect(userName).toBe('Dev_Tester');
    expect(firstPref).not.toBeUndefined();
  });

  // 6. Template Literal Types
  it('validates theme strings', () => {
    type ThemeKey = `theme-${string}`;
    const key: ThemeKey = 'theme-deep-red-blue';
    expect(key).toContain('deep-red');
  });
});
