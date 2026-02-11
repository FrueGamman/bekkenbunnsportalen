import React from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";

// UA helpers for broad in-app/webview detection
function getUA(): string {
  // Prefer standard UA as UA-CH is not universally available across IABs
  return navigator.userAgent || (navigator as any).vendor || "";
}

function isStandalonePWA(): boolean {
  try {
    return (
      (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      (navigator as any).standalone === true
    );
  } catch {
    return false;
  }
}

export function isAndroidWebView(): boolean {
  const ua = getUA();
  return /; wv\)|\bwv\b/i.test(ua) || /Version\/\d+\.\d+ Chrome\/.+ Mobile Safari\/.+\bwv\b/i.test(ua);
}

export function isIOSWebView(): boolean {
  const ua = getUA();
  return /(iPhone|iPad|iPod)/.test(ua) && !/Safari/i.test(ua);
}

export function isSamsungBrowser(): boolean {
  return /SamsungBrowser/i.test(getUA());
}

export function isFacebookIAB(): boolean {
  return /FBAN|FBAV|FB_IAB/i.test(getUA());
}

export function isInstagramIAB(): boolean {
  return /Instagram|IG/i.test(getUA());
}

export function isTikTokIAB(): boolean {
  return /TTWebView|TikTok/i.test(getUA());
}

export function isSnapIAB(): boolean {
  return /Snapchat/i.test(getUA());
}

export function isTwitterIAB(): boolean {
  return /Twitter/i.test(getUA());
}

export function isLinkedInIAB(): boolean {
  return /LinkedInApp/i.test(getUA());
}

export function isRedditIAB(): boolean {
  return /Reddit/i.test(getUA());
}

export function isTelegramIAB(): boolean {
  return /Telegram/i.test(getUA());
}

export function isWhatsAppIAB(): boolean {
  return /WhatsApp/i.test(getUA());
}

export function isInAppBrowser(): boolean {
  return (
    isFacebookIAB() ||
    isInstagramIAB() ||
    isTikTokIAB() ||
    isSnapIAB() ||
    isTwitterIAB() ||
    isLinkedInIAB() ||
    isRedditIAB() ||
    isTelegramIAB() ||
    isWhatsAppIAB()
  );
}

export function shouldUseHashRouter(): boolean {
  if ((import.meta as any).env?.VITE_FORCE_HASH === "1") return true;
  const ua = getUA();
  const forceByStandaloneSamsung = isStandalonePWA() && /Samsung|Android/i.test(ua);
  // HashRouter on IABs and webviews; Samsung Internet due to History API quirks
  return (
    isSamsungBrowser() ||
    isAndroidWebView() ||
    isIOSWebView() ||
    isInAppBrowser() ||
    forceByStandaloneSamsung
  );
}

export const AppRouter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const useHash = shouldUseHashRouter();
  // Deep link fix: path → hash on affected browsers
  if (useHash && !location.hash && (location.pathname !== "/" || location.search)) {
    const hashUrl = `/#${location.pathname}${location.search}${location.hash}`;
    location.replace(hashUrl);
  }
  return useHash ? <HashRouter>{children}</HashRouter> : <BrowserRouter>{children}</BrowserRouter>;
};


