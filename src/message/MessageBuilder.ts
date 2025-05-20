import { Caller, MessageAction } from "constant/Enum"
import { Message } from "./Message"

export function sendMessage(message: Message) {
  chrome.runtime.sendMessage(message)
}

export function sendTabMessage(tabId: number, message: Message) {
  chrome.tabs.sendMessage(tabId, message)
}

export interface MessageI {
  action: MessageAction
  log: string
}

export interface MessageTabI extends MessageI {
  tabId: number
}

export class MessageBuilder {
  caller: Caller

  constructor (caller: Caller) {
    this.caller = caller
  }

  sendMessage(msg: MessageI) {
    chrome.runtime.sendMessage(new Message(msg.action, this.caller, msg.log))
  }

  sendTabMessage(msg: MessageTabI) {
    chrome.tabs.sendMessage(msg.tabId, new Message(msg.action, this.caller, msg.log))
  }
}