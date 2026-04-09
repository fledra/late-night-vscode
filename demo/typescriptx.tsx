/**
 * @file TSX (React + TypeScript) Stress Test
 * Testing generics in JSX, Type Assertions, and Interface props.
 */

import React, { useState, ReactNode, MouseEvent } from 'react';

// 1. Complex Interface & Type Definitions
interface UserProfile {
  id: string | number;
  metadata: {
    lastLogin: Date;
    preferences: Record<string, boolean | string>;
  };
}

type Status = 'loading' | 'success' | 'error';

interface DataContainerProps<T> {
  data: T[];
  status: Status;
  renderItem: (item: T) => ReactNode;
  children?: ReactNode;
}

// 2. Generic Component Stress Test
const DataGrid = <T extends { id: string | number }>({
  data,
  status,
  renderItem,
}: DataContainerProps<T>): JSX.Element => {
  return (
    <div className={`grid-container grid-${status}`}>
      {data.map((item) => (
        <div key={item.id} className='grid-item'>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
};

// 3. Main Component with Hooks and Complex State
export const TSXTester: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<Error | undefined>();

  // Testing Event Types and Type Assertions
  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    const target = event.currentTarget as HTMLButtonElement;
    console.log(`Clicked button: ${target.name}`);

    // Inline type casting inside a template literal
    const msg = `User ID is: ${(user?.id as string) ?? 'Unknown'}`;
    alert(msg);
  };

  // Testing Generic usage inside JSX attributes
  return (
    <section className='tsx-root'>
      <header>
        <h1 style={{ color: user ? 'var(--blue)' : '#5a1d1d' }}>TSX Highlighting Test</h1>
      </header>

      {/* Passing a generic component with complex props */}
      <DataGrid<UserProfile>
        status={error ? 'error' : 'success'}
        data={user ? [user] : []}
        renderItem={(item) => (
          <article data-auth={!!item.metadata.preferences['admin']}>
            <span>Last Login: {item.metadata.lastLogin.toISOString()}</span>

            {/* Recursive/Nested JSX Logic */}
            {item.id === 'root' && (
              <button name='admin-btn' onClick={(e) => handleClick(e)}>
                Re-Authenticate
              </button>
            )}
          </article>
        )}
      />

      {/* Testing Fragments and Object-as-Prop */}
      <React.Fragment>
        <footer
          className='footer-debug'
          // Testing complex object literal in prop
          style={
            {
              display: 'flex',
              opacity: error ? 1 : 0.5,
            } as React.CSSProperties
          }
        >
          <small>Version: {1.0 + 0.2}</small>
        </footer>
      </React.Fragment>
    </section>
  );
};

// 4. Testing a "const enum" style object and Utility Types
const THEME_MODES = {
  DARK: 'dark',
  LIGHT: 'light',
} as const;

type ThemeMode = (typeof THEME_MODES)[keyof typeof THEME_MODES];

const getStyle = (mode: ThemeMode): string => {
  return mode === THEME_MODES.DARK ? 'bg-black' : 'bg-white';
};
