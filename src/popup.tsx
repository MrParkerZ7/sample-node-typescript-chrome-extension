import React from "react"
import { createRoot } from "react-dom/client"
import { MessageAction, CALLER } from "./Enum"

const links = [
  { label: "Google", url: "https://www.google.com" },
  { label: "Facebook", url: "https://www.facebook.com" },
  { label: "Instagram", url: "https://www.instagram.com" },
  { label: "TikTok", url: "https://www.tiktok.com" },
  { label: "YouTube", url: "https://www.youtube.com" },
]

const handleGoogleSearch = () => {
  const searchTerm = "abc"
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    searchTerm
  )}`
  window.open(searchUrl, "_blank")
}

const messageToCurrentTab = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id!, {
      action: MessageAction.CONTENT_LOG,
    })
  })
}

const messageToNewTab = () => {
  chrome.tabs.create({ url: "https://www.google.com/" }, (tab) => {
    if (!tab.id) {
      chrome.runtime.sendMessage({
        action: MessageAction.SERVICE_WORKER_LOG,
        caller: CALLER.POPUP_EXTENSION,
        log: "New Tab Not Having ID !",
      })
      return
    } else {
      chrome.runtime.sendMessage({
        action: MessageAction.SERVICE_WORKER_LOG,
        caller: CALLER.POPUP_EXTENSION,
        log: "New Tab Having ID !",
      })
    }

    const listener = (tabId: number, changeInfo: chrome.tabs.TabChangeInfo) => {
      if (tabId === tab.id && changeInfo.status === "complete") {
        chrome.tabs.sendMessage(tab.id!, {
          action: MessageAction.SERVICE_WORKER_LOG,
          caller: CALLER.POPUP_EXTENSION,
          log: "New Tab Loaded!",
        })

        chrome.tabs.onUpdated.removeListener(listener)
      } else {
        chrome.runtime.sendMessage({
          action: MessageAction.SERVICE_WORKER_LOG,
          caller: CALLER.POPUP_EXTENSION,
          log: "New Tab Not Loaded!",
        })
      }
    }
    chrome.tabs.onUpdated.addListener(listener)
  })

  chrome.runtime.sendMessage({
    action: MessageAction.CONTENT_LOG,
    caller: CALLER.POPUP_EXTENSION,
    log: "Call CONTENT_LOG",
  })

  chrome.runtime.sendMessage({
    action: MessageAction.SERVICE_WORKER_LOG,
    caller: CALLER.POPUP_EXTENSION,
    log: "Call SERVICE_WORKER_LOG",
  })
}

const Popup = () => {
  return (
    <div
      style={{ padding: "1rem", fontFamily: "sans-serif", minWidth: "200px" }}
    >
      <h2>MrParkerZ7 TS-Chrome-Extension</h2>
      {links.map((link) => (
        <button
          key={link.label}
          onClick={() => window.open(link.url, "_blank")}
          style={{
            display: "block",
            width: "100%",
            margin: "0.5rem 0",
            padding: "0.5rem",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          {link.label}
        </button>
      ))}

      <button
        onClick={handleGoogleSearch}
        style={{
          display: "block",
          width: "100%",
          margin: "0.5rem 0",
          padding: "0.5rem",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Search "abc" on Google
      </button>
      <button
        onClick={messageToNewTab}
        style={{
          display: "block",
          width: "100%",
          margin: "0.5rem 0",
          padding: "0.5rem",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Message To New Tab
      </button>
      <button
        onClick={messageToCurrentTab}
        style={{
          display: "block",
          width: "100%",
          margin: "0.5rem 0",
          padding: "0.5rem",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Message To Current Tab
      </button>
    </div>
  )
}

const container = document.getElementById("react-target") as HTMLElement
const root = createRoot(container)
root.render(<Popup />)
