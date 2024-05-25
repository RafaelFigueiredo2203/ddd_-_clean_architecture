import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentRepository } from '../repositories/question-comments-repository';
import { QuestionsRepository } from '../repositories/questions-repository';

interface CommentOnQuestionUseCaseRequest {
  authorId:string
  questionId:string
  content:string
}

interface CommentOnQuestionUseCaseResponse {
  questionComment:QuestionComment
}


export class CommentOnQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository,
    private questionCommentRepository:QuestionCommentRepository
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest):Promise<CommentOnQuestionUseCaseResponse> {
    const question =  await this.questionRepository.findById(questionId)
    
    if(!question){
      throw new Error('Question not found')
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId).toString(),
      content
    })

    await this.questionCommentRepository.create(questionComment)

    return{
      questionComment
    }
  }
}
