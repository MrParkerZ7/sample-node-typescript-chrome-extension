import { MessageAction, Caller } from "../constant/Enum"

export class Message {
  action: MessageAction
  caller: Caller
  log: string | undefined

  constructor (action: MessageAction, caller: Caller, log: string) {
    this.action = action
    this.caller = caller
    this.log = log
  }

}
