# Testing Guide

This document describes the comprehensive testing setup for the Pelvic React application.

## Testing Stack

- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Playwright
- **Accessibility Tests**: Playwright + axe-core
- **Content Audit**: Python-based crawler and comparison tools
- **CI/CD**: GitHub Actions

## Running Tests

### Unit Tests

```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode
npm run test:e2e:headed

# Run accessibility tests only
npm run test:a11y
```

### Content Audit

```bash
# Run content audit (requires Python)
npm run audit:content
```

## Test Structure

### Unit Tests (`src/__tests__/`)

- **Component Tests**: Test individual React components
- **Hook Tests**: Test custom hooks
- **Utility Tests**: Test utility functions
- **Context Tests**: Test React context providers

### E2E Tests (`tests/e2e/`)

- **Homepage Tests**: Test main page functionality
- **Navigation Tests**: Test routing and navigation
- **Accessibility Tests**: Test WCAG compliance
- **Performance Tests**: Test page load times
- **Mobile Tests**: Test responsive design

## Writing Tests

### Unit Test Example

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../context/ThemeContext';
import { ThemeToggle } from '../components/ThemeToggle';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('ThemeToggle', () => {
  it('toggles theme when clicked', () => {
    renderWithTheme(<ThemeToggle />);
    
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    
    expect(toggleButton).toHaveTextContent('Light');
  });
});
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test';

test('should load homepage successfully', async ({ page }) => {
  await page.goto('/');
  
  await expect(page).toHaveTitle(/Bekkenbunnsportalen/);
  await expect(page.getByRole('navigation')).toBeVisible();
});
```

## Test Configuration

### Jest Configuration (`jest.config.js`)

- TypeScript support with ts-jest
- jsdom environment for React testing
- Coverage thresholds: 70% for all metrics
- File mocking for assets

### Playwright Configuration (`playwright.config.ts`)

- Multiple browser support (Chrome, Firefox, Safari)
- Mobile device testing
- Screenshot and video recording on failure
- Parallel test execution

## Accessibility Testing

### Automated Tests

- Heading hierarchy validation
- Focus management testing
- ARIA label verification
- Keyboard navigation testing
- Color contrast validation

### Manual Testing Checklist

- [ ] Screen reader compatibility
- [ ] Keyboard-only navigation
- [ ] High contrast mode support
- [ ] Reduced motion preferences
- [ ] Touch target sizes (44px minimum)

## Performance Testing

### Metrics Tracked

- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)

### Performance Budgets

- Bundle size: < 500KB gzipped
- Initial load: < 3 seconds
- Time to Interactive: < 5 seconds

## Content Audit

### Audit Process

1. **Crawl**: Extract content from old and new sites
2. **Compare**: Find matching pages and identify gaps
3. **Map**: Create migration mapping for content
4. **Report**: Generate detailed audit reports

### Audit Tools

- `tools/audit/crawl.py`: Site crawler
- `tools/audit/compare.py`: Content comparison
- `tools/audit/export_map.py`: Migration mapping

## CI/CD Pipeline

### GitHub Actions Workflow

1. **Lint**: ESLint and TypeScript checks
2. **Test**: Unit tests with coverage
3. **Build**: Production build verification
4. **E2E**: End-to-end testing
5. **Accessibility**: Automated a11y testing
6. **Security**: Dependency vulnerability scan
7. **Deploy**: Automatic deployment to staging/production

### Quality Gates

- All tests must pass
- Coverage must meet thresholds
- No security vulnerabilities
- Accessibility compliance
- Performance budgets met

## Debugging Tests

### Unit Tests

```bash
# Run specific test file
npm test -- ThemeToggle.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="theme toggle"

# Debug mode
npm test -- --verbose
```

### E2E Tests

```bash
# Run specific test
npx playwright test homepage.spec.ts

# Debug mode
npx playwright test --debug

# Show browser
npx playwright test --headed
```

## Best Practices

### Unit Testing

- Test behavior, not implementation
- Use meaningful test descriptions
- Mock external dependencies
- Test edge cases and error states
- Keep tests simple and focused

### E2E Testing

- Test user journeys, not individual features
- Use data-testid for reliable element selection
- Wait for elements to be ready
- Test on multiple devices and browsers
- Keep tests independent and isolated

### Accessibility Testing

- Test with real assistive technologies
- Validate ARIA attributes
- Test keyboard navigation
- Check color contrast ratios
- Verify focus management

## Troubleshooting

### Common Issues

1. **Tests timing out**: Increase timeout or add proper waits
2. **Flaky tests**: Use more reliable selectors
3. **Coverage gaps**: Add tests for untested code paths
4. **Build failures**: Check TypeScript errors and dependencies

### Getting Help

- Check test logs for detailed error messages
- Use debugging tools (browser dev tools, Playwright inspector)
- Review test documentation and examples
- Ask team members for assistance

## Continuous Improvement

### Regular Tasks

- Review and update test coverage
- Update dependencies and tools
- Refactor flaky or slow tests
- Add tests for new features
- Monitor test performance

### Metrics to Track

- Test execution time
- Test coverage percentage
- Flaky test frequency
- Bug escape rate
- Performance regression frequency
