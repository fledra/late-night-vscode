import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from './ThemeContext';
import AppButton from './AppButton';

/**
 * Testing JSX inside JS with Jest/Testing-Library
 */
describe('AppButton Component', () => {
  const mockProps = {
    label: 'Click Me',
    theme: 'deep-red-blue',
    onClick: jest.fn(),
  };

  test('renders with correct styles and responds to clicks', () => {
    // 1. JSX Syntax inside JS
    render(
      <ThemeProvider value={mockProps.theme}>
        <AppButton {...mockProps} />
      </ThemeProvider>
    );

    // 2. DOM Queries and RegEx
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('btn-red');

    // 3. Event Simulation
    fireEvent.click(buttonElement);
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<AppButton {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
