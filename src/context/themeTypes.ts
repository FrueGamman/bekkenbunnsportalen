export type ThemeMode = "light" | "dark";
export type ContrastMode = "normal" | "high";

export interface ThemeContextType {
  theme: ThemeMode;
  contrast: ContrastMode;
  resolvedTheme: "light" | "dark"; // The actual theme being used
  toggleTheme: () => void;
  toggleContrast: () => void;
  setTheme: (theme: ThemeMode) => void;
  setContrast: (contrast: ContrastMode) => void;
}

// Resolve the actual theme to use
export const resolveTheme = (currentTheme: ThemeMode): "light" | "dark" =>
  currentTheme;
