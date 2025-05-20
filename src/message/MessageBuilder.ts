import { Service, MessageAction } from "../constant/Enum"
import { Message } from "./Message"

export interface MessageI {
  action: MessageAction
  log: string
}

export interface MessageTabI extends MessageI {
  tabId: number
}

export class MessageBuilder {
  caller: Service

  constructor (caller: Service) {
    this.caller = caller
  }

  sendMessage(msg: MessageI) {
    chrome.runtime.sendMessage(new Message(msg.action, this.caller, msg.log))
  }

  sendTabMessage(msg: MessageTabI) {
    chrome.tabs.sendMessage(msg.tabId, new Message(msg.action, this.caller, msg.log))
  }

  getTabUrlLogSW(tabId: number) {
    chrome.tabs.get(tabId, (tab) => {
      const url = tab?.url

      if (!url) {
        this.sendMessage({
          action: MessageAction.SERVICE_WORKER_LOG,
          log: `Tab ID ${tabId} has no URL or tab not found`
        })
        return
      }

      this.sendMessage({
        action: MessageAction.SERVICE_WORKER_LOG,
        log: `Tab ID ${tabId} has URL: ${url}`
      })
    })
  }
}