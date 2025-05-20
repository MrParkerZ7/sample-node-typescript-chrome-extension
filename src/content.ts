import { MessageAction, Service } from "./constant/Enum"

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === MessageAction.CONTENT_LOG) {
    chrome.runtime.sendMessage({
      action: MessageAction.SERVICE_WORKER_LOG,
      caller: Service.CONTENT_SCRIPT,
      log: Service.CONTENT_SCRIPT + " forward: " + JSON.stringify(message),
    })
    return true
  } else {
    chrome.runtime.sendMessage({
      action: MessageAction.SERVICE_WORKER_LOG,
      caller: Service.CONTENT_SCRIPT,
      log: Service.CONTENT_SCRIPT + " forward unknown action: " + JSON.stringify(message),
    })
  }
})
