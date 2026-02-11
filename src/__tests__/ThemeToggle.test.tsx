import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../context/ThemeProvider';
import { ThemeToggle } from '../components/ThemeToggle';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders theme toggle button', () => {
    renderWithTheme(<ThemeToggle />);

    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-label');
  });

  it('shows current theme mode', () => {
    renderWithTheme(<ThemeToggle />);

    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toHaveTextContent('Light');
  });

  it('toggles theme when clicked', () => {
    renderWithTheme(<ThemeToggle />);

    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    expect(toggleButton).toHaveTextContent('Dark');
  });

  it('cycles through all theme modes', () => {
    renderWithTheme(<ThemeToggle />);

    const toggleButton = screen.getByRole('button');

    // Initial: Light
    expect(toggleButton).toHaveTextContent('Light');

    // Light -> Dark
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent('Dark');

    // Dark -> Light
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent('Light');
  });

  it('has proper accessibility attributes', () => {
    renderWithTheme(<ThemeToggle />);

    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toHaveAttribute('aria-label');
    expect(toggleButton).toHaveAttribute('title');
  });

  it('saves theme preference to localStorage', () => {
    renderWithTheme(<ThemeToggle />);

    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });
});
