import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './comment'

export interface QuestionComentProps extends CommentProps{
 questionId:string
}

export class QuestionComment extends Comment<QuestionComentProps> {

  get questionId(){
    return this.props.questionId
  }

  static create(
    props: Optional<QuestionComentProps, 'created_at'>,
    id?: UniqueEntityId,
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
      },
      id,
    )

    return questionComment
  }
}



