import { Entity } from "@/core/entities/entity"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"

interface QuestionAttachmentProps{
  questionId:UniqueEntityId
  attachment: UniqueEntityId
}
export class QuestionAttachment extends Entity<QuestionAttachmentProps>{
  get questionId(){
    return this.props.questionId
  }

  get attachment(){
    return this.props.attachment
  }

  static create(props:QuestionAttachmentProps, id?:UniqueEntityId){
    const questionAttachment = new QuestionAttachment(props,id)

    return questionAttachment
  }
}