import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './comment'

export interface AnswerCoomentProps extends CommentProps{
 answerId:string
}

export class AnswerComment extends Comment<AnswerCoomentProps> {

  get answerId(){
    return this.props.answerId
  }

  static create(
    props: Optional<AnswerCoomentProps, 'created_at'>,
    id?: UniqueEntityId,
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
      },
      id,
    )

    return answerComment
  }
}
