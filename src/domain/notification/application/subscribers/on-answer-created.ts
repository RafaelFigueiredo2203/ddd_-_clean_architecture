import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handdler";
import { AnswerCreatedEvents } from "@/domain/forum/enterprise/events/answer-created-events";

export class OnAnswerCreated implements EventHandler{
  constructor() {
    this.setupSubscriptions
  }

  setupSubscriptions():void{
    DomainEvents.register(this.sendNewAnswerNotification.bind(this) , AnswerCreatedEvents.name)
  }
  
  private async sendNewAnswerNotification({answer}:AnswerCreatedEvents){
    console.log(answer)
  }
}