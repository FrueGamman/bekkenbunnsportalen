import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

// Modern way to ensure matchers are registered if the automatic way fails
import * as matchers from '@testing-library/jest-dom/matchers';
// Filter out the 'default' property which is an object and not a matcher function
const matcherFunctions = Object.fromEntries(
  Object.entries(matchers).filter(([key, value]) => typeof value === 'function' && key !== 'default')
);
expect.extend(matcherFunctions);

// Mock IntersectionObserver
globalThis.IntersectionObserver = jest.fn().mockImplementation(() => ({
  disconnect: jest.fn(),
  observe: jest.fn(),
  unobserve: jest.fn(),
  takeRecords: jest.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
})) as unknown as typeof IntersectionObserver;

// Mock ResizeObserver
globalThis.ResizeObserver = jest.fn().mockImplementation(() => ({
  disconnect: jest.fn(),
  observe: jest.fn(),
  unobserve: jest.fn(),
})) as unknown as typeof ResizeObserver;

// Mock matchMedia
Object.defineProperty(globalThis, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock storage factory
const createStorageMock = () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  key: jest.fn(),
  length: 0,
});

const mockLocalStorage = createStorageMock();
const mockSessionStorage = createStorageMock();

Object.defineProperty(globalThis, 'localStorage', {
  value: mockLocalStorage,
  writable: true
});

Object.defineProperty(globalThis, 'sessionStorage', {
  value: mockSessionStorage,
  writable: true
});

// Mock scrollTo
Object.defineProperty(globalThis, 'scrollTo', {
  value: jest.fn(),
  writable: true,
});
