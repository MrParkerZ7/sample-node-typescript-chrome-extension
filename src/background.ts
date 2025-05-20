import { MessageAction, CALLER } from "./Enum"

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed!");
});

chrome.runtime.onMessage.addListener((message, sender) => {
  // console.log("Message from sender:", sender)
  if (message.action === MessageAction.SERVICE_WORKER_LOG) {
    console.log(MessageAction.SERVICE_WORKER_LOG, ":", message)
  } else {
    console.log('Unknown action: ', message)
  }
})