import { Message } from "message/Message";
import { MessageAction, Caller } from "./constant/Enum"

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed!");
});

chrome.runtime.onMessage.addListener((message: Message, sender) => {
  if (message.action === MessageAction.SERVICE_WORKER_LOG) {
    console.log(MessageAction.SERVICE_WORKER_LOG, ":", JSON.stringify(message))
  } else {
    console.log('Unknown action: ', JSON.stringify(message))
  }
})