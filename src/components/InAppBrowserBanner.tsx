"use client"
import { useEffect, useState } from "react"
import { isInAppBrowser, isFacebookIAB } from "../router"

export function InAppBrowserBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem("iab_banner_dismissed") === "1"
      if (!dismissed && isInAppBrowser()) {
        setVisible(true)
      }
    } catch {
      if (isInAppBrowser()) setVisible(true)
    }
  }, [])

  if (!visible) return null

  const onDismiss = () => {
    try { sessionStorage.setItem("iab_banner_dismissed", "1") } catch {}
    setVisible(false)
  }

  const onOpen = () => {
    try {
      const url = window.location.href
      const ua = navigator.userAgent || ""
      const isAndroid = /Android/i.test(ua)
      if (isAndroid && isFacebookIAB()) {
        // Try Android Chrome Intent to break out of Facebook IAB
        const loc = window.location
        const scheme = loc.protocol.replace(":", "") || "https"
        const intent = `intent://${loc.host}${loc.pathname}${loc.search}${loc.hash}#Intent;scheme=${scheme};package=com.android.chrome;end`
        window.location.href = intent
        // Fallbacks if intent is blocked
        setTimeout(() => {
          try { window.open(url, "_blank", "noopener,noreferrer") } catch {}
        }, 200)
        // Last-resort: prompt Chrome install/open on Play Store
        setTimeout(() => {
          try { window.location.href = "market://details?id=com.android.chrome" } catch {}
          setTimeout(() => { try { window.location.href = "https://play.google.com/store/apps/details?id=com.android.chrome" } catch {} }, 400)
        }, 600)
        return
      }
      window.open(url, "_blank", "noopener,noreferrer")
    } catch {}
  }

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      onDismiss()
    } catch {
      onDismiss()
    }
  }

  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: "rgba(12,17,23,0.95)",
      color: "#fff",
      padding: "12px 16px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      boxShadow: "0 -4px 12px rgba(0,0,0,0.3)",
    }}>
      <span style={{ fontSize: 14 }}>
        You are viewing this page inside an in-app browser. For the best experience, open it in your browser.
      </span>
      <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
        <button onClick={onOpen} style={{ background: "#2563eb", color: "#fff", border: 0, borderRadius: 6, padding: "8px 12px" }}>Open</button>
        <button onClick={onCopy} style={{ background: "#374151", color: "#fff", border: 0, borderRadius: 6, padding: "8px 12px" }}>Copy link</button>
        <button onClick={onDismiss} style={{ background: "transparent", color: "#cbd5e1", border: "1px solid #475569", borderRadius: 6, padding: "8px 12px" }}>Dismiss</button>
      </div>
    </div>
  )
}


