import React from "react"
import { createRoot } from "react-dom/client"
import { MessageAction, Service } from "./constant/Enum"
import { MessageBuilder } from "./message/MessageBuilder"

const links = [
  { label: "Google", url: "https://www.google.com" },
  { label: "Facebook", url: "https://www.facebook.com" },
  { label: "Instagram", url: "https://www.instagram.com" },
  { label: "TikTok", url: "https://www.tiktok.com" },
  { label: "YouTube", url: "https://www.youtube.com" },
]

const msgPopUp = new MessageBuilder(Service.POPUP_EXTENSION)

const messageToCurrentTab = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id
    if (tabId) {
      msgPopUp.sendTabMessage({
        tabId,
        action: MessageAction.CONTENT_LOG,
        log: "Message to current tab",
      })
    } else {
      msgPopUp.sendMessage({
        action: MessageAction.SERVICE_WORKER_LOG,
        log: "Message to current tab not found tabId",
      })
    }
  })
}

const messageLogCurrentTabURL = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id

    msgPopUp.getTabUrlLogSW(tabId!)
  })
}

const messageToNewTab = () => {
  chrome.tabs.create({ url: "https://www.google.com/" }, (tab) => {
    if (!tab.id) {
      msgPopUp.sendMessage({
        action: MessageAction.SERVICE_WORKER_LOG,
        log: "New Tab Not Having ID !",
      })
      return
    } else {
      msgPopUp.sendMessage({
        action: MessageAction.SERVICE_WORKER_LOG,
        log: "New Tab Having ID !",
      })
    }

    const listener = (tabId: number, changeInfo: chrome.tabs.TabChangeInfo) => {
      if (tabId === tab.id && changeInfo.status === "complete") {
        msgPopUp.sendTabMessage({
          tabId,
          action: MessageAction.SERVICE_WORKER_LOG,
          log: "New Tab Loaded! " + tabId,
        })

        chrome.tabs.onUpdated.removeListener(listener)
      } else {
        msgPopUp.sendMessage({
          action: MessageAction.SERVICE_WORKER_LOG,
          log: "New Tab Not Loaded!",
        })
      }
    }
    chrome.tabs.onUpdated.addListener(listener)
  })

  msgPopUp.sendMessage({
    action: MessageAction.CONTENT_LOG,
    log: "Popup Message",
  })

  msgPopUp.sendMessage({
    action: MessageAction.SERVICE_WORKER_LOG,
    log: "Popup Message",
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
      <button
        onClick={messageLogCurrentTabURL}
        style={{
          display: "block",
          width: "100%",
          margin: "0.5rem 0",
          padding: "0.5rem",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Message To Current Tab URL
      </button>
    </div>
  )
}

const container = document.getElementById("react-target") as HTMLElement
const root = createRoot(container)
root.render(<Popup />)
