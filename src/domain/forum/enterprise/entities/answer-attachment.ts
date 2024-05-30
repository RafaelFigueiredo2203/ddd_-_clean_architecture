import { Entity } from "@/core/entities/entity"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"

interface AnswerAttachmentProps{
  answerId:UniqueEntityId
  attachment: UniqueEntityId
}
export class AnswerAttachment extends Entity<AnswerAttachmentProps>{
  get answerId(){
    return this.props.answerId
  }

  get attachment(){
    return this.props.attachment
  }

  static create(props:AnswerAttachmentProps, id?:UniqueEntityId){
    const answerAttachment = new AnswerAttachment(props,id)

    return answerAttachment
  }
}