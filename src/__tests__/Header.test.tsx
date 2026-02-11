import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeProvider';
import { LanguageProvider } from '../context/LanguageProvider';
import { Header } from '../components/Header';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          {component}
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Header', () => {
  it('renders header with navigation links', () => {
    renderWithProviders(<Header />);
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('Hjem')).toBeInTheDocument();
    expect(screen.getByText('Helsetilstander')).toBeInTheDocument();
    expect(screen.getByText('Nyttig informasjon')).toBeInTheDocument();
    expect(screen.getByText('Spesialiserte fagområder')).toBeInTheDocument();
  });

  it('renders theme toggle', () => {
    renderWithProviders(<Header />);
    
    const themeToggle = screen.getByRole('button', { name: /switch to/i });
    expect(themeToggle).toBeInTheDocument();
  });

  it('renders language selector', () => {
    renderWithProviders(<Header />);
    
    const languageSelector = screen.getByRole('combobox');
    expect(languageSelector).toBeInTheDocument();
  });

  it('renders search input', () => {
    renderWithProviders(<Header />);
    
    const searchInput = screen.getByRole('searchbox');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('placeholder');
  });

  it('renders healthcare button', () => {
    renderWithProviders(<Header />);
    
    const healthcareButton = screen.getByRole('button', { name: /helsepersonell/i });
    expect(healthcareButton).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    renderWithProviders(<Header />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label');
  });

  it('renders mobile menu button on small screens', () => {
    // Mock small screen
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    renderWithProviders(<Header />);
    
    const mobileMenuButton = screen.getByRole('button', { name: /toggle mobile menu/i });
    expect(mobileMenuButton).toBeInTheDocument();
  });
});
