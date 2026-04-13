/**
 * @file JSX/React Stress Test
 * Testing Tag/Component distinctions and embedded JS expressions.
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

const THEME_CONSTANT = 'deep-red-blue';

/**
 * A complex wrapper component to test high-level JSX tokens.
 */
const HighOrderComponent = ({ children, renderOverlay }) => {
  return (
    <div className='hoc-wrapper'>
      {renderOverlay()}
      <main>{children}</main>
    </div>
  );
};

export default async function ThemeTester({ user = { name: 'Guest', roles: [] }, isActive = false, onAction }) {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  // Testing logic within hooks
  useEffect(() => {
    const timer = setInterval(() => {
      console.log(`Interval check: ${THEME_CONSTANT}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Testing event handlers and arrow functions
  const handleIncrement = useCallback(
    (e) => {
      e.preventDefault();
      setCount((prev) => prev + 1);
      if (onAction) onAction('increment');
    },
    [onAction]
  );

  // Complex list rendering with conditional styles
  const renderList = useMemo(() => {
    return items.map((item, index) => (
      <li
        key={item.id || index}
        className={`list-item ${isActive ? 'active' : 'inactive'}`}
        style={{
          color: index % 2 === 0 ? '#1a3a4a' : '#5a1d1d',
          fontWeight: isActive ? 'bold' : 'normal',
        }}
      >
        {/* Nested JSX and Ternaries */}
        {item.label ?? <span>Default Item</span>}
        <button onClick={() => alert(`Deleted ${item.id}`)}>&times; {/* HTML Entity */}</button>
      </li>
    ));
  }, [items, isActive]);

  return (
    <HighOrderComponent renderOverlay={() => <nav>Toolbar</nav>}>
      <section id='main-content' data-test-id='theme-section'>
        {/* Component vs HTML Tag */}
        <h1 className={THEME_CONSTANT}>React Theme Test</h1>

        <p>
          Current Count: <strong>{count}</strong>
        </p>

        {/* Attributes: Booleans, Objects, and Callbacks */}
        <CustomInput
          disabled={!isActive}
          options={{ dark: true, rounded: false }}
          onChange={handleIncrement}
          aria-label='Increment counter'
        />

        <ul className='item-container'>{items.length > 0 ? renderList : <li className='empty'>No items found.</li>}</ul>

        {/* Self-closing and Fragment test */}
        <>
          <hr />
          <footer>
            <small>© 2026 Developer Edition</small>
          </footer>
        </>
      </section>
    </HighOrderComponent>
  );
}

// Sub-component to test internal scope and Prop types
function CustomInput({ disabled, options, onChange }) {
  return (
    <div className='input-group'>
      <input type='text' placeholder='Type here...' disabled={disabled} onChange={(e) => onChange(e.target.value)} />
      {options.rounded && <div className='indicator' />}
    </div>
  );
}

ThemeTester.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
  isActive: PropTypes.bool,
  onAction: PropTypes.func,
};
