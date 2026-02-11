import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import { AppRouter } from "./router";
import { LanguageProvider } from "./context/LanguageProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { App } from "./pages/App";
import { Useful } from "./pages/useful/Useful";
import { About } from "./pages/About";
import Accessibility from "./pages/Accessibility";
import Tilgjengelighet from "./pages/Tilgjengelighet";
import Personvern from "./pages/Personvern";
// Import the condition page that can handle multiple conditions
import ConditionPage from "./pages/conditions/ConditionPage";
// Import the new professionals page
// import ProfessionalPage from "./pages/professional/ProfessionalPage";
import { Helsepersonell } from "./pages/helsepersonell/Helsepersonell";
import { Gynekologi } from "./pages/disciplines/gynekologi/Gynekologi";
import { TestPage } from "./pages/test/TestPage";
import { SearchResults } from "./pages/search/SearchResults";
// Removed separate specialized content routes - now integrated into professional page
import "./index.css";
import "./styles/theme.css";
import Anatomy from "./pages/anatomy/Anatomy";
import { RouteSEO } from "./seo/RouteSEO";
import { InAppBrowserBanner } from "./components/InAppBrowserBanner";
import { Analytics } from "@vercel/analytics/react";
// Import axe-core for accessibility testing in development
if (import.meta.env.DEV) {
  import('@axe-core/react').then(axe => {
    axe.default(React, ReactDOM, 1000);
  });
}

// iOS Safari viewport height fix for mobile devices
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set on load
setViewportHeight();

// Update on resize and orientation change
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Analytics />
    <AppRouter>
      <ThemeProvider>
        <LanguageProvider>
          <RouteSEO />
          <InAppBrowserBanner />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/tilgjengelighet" element={<Tilgjengelighet />} />
            <Route path="/personvern" element={<Personvern />} />
            {/* Use dynamic routing for conditions */}
            <Route path="/conditions/:id" element={<ConditionPage />} />
            {/* Optional: redirect /conditions to default condition */}
            <Route path="/conditions" element={<ConditionPage />} />
            <Route path="/useful" element={<Useful />} />
            {/* Search results page */}
            <Route path="/search" element={<SearchResults />} />
            {/* New professionals routes */}
            {/* <Route path="/professionals" element={<ProfessionalsSection />} /> */}
            <Route path="/professional" element={<Helsepersonell />} />
            <Route path="/anatomy" element={<Anatomy />} />
            <Route path="/professional/:discipline" element={<Helsepersonell />} />
            <Route path="/helsepersonell" element={<Helsepersonell />} />
            {/* Discipline pages */}
            <Route path="/disciplines/gynekologi" element={<Gynekologi />} />
            {/* Test page for debugging */}
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </LanguageProvider>
      </ThemeProvider>
    </AppRouter>
  </React.StrictMode>
);