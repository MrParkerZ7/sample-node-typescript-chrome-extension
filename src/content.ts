import { MessageAction, CALLER } from "./Enum"

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === MessageAction.CONTENT_LOG) {
    chrome.runtime.sendMessage({
      action: MessageAction.SERVICE_WORKER_LOG,
      caller: CALLER.CONTENT_SCRIPT,
      log: CALLER.CONTENT_SCRIPT + " forward: " + message,
    })
    return true
  } else {
    chrome.runtime.sendMessage({
      action: MessageAction.SERVICE_WORKER_LOG,
      caller: CALLER.CONTENT_SCRIPT,
      log: CALLER.CONTENT_SCRIPT + " forward unknown action: " + message,
    })
  }
})
