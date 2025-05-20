import { MessageAction, Service } from "../constant/Enum"

export class Message {
  action: MessageAction
  caller: Service
  log: string | undefined

  constructor (action: MessageAction, caller: Service, log: string) {
    this.action = action
    this.caller = caller
    this.log = log
  }

}
