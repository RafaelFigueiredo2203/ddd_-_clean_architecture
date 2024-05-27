import { QuestionCommentRepository } from '../repositories/question-comments-repository';

interface DeleteQuestionCommentUseCaseRequest {
  authorId:string
  questionCommentId:string
}

interface DeleteQuestionCommentUseCaseResponse {}


export class DeleteQuestionCommentUseCase {
  constructor(
    private questionCommentRepository:QuestionCommentRepository
  ) {}

  async execute({
    authorId,
    questionCommentId
  }: DeleteQuestionCommentUseCaseRequest):Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =  await this.questionCommentRepository.findById(questionCommentId)
    
    if(!questionComment){
      throw new Error('Question Comment not found')
    }

    if(questionComment.authorId.toString() !== authorId){
      throw new Error('Not Allowed')
    }

    await this.questionCommentRepository.delete(questionComment)

    return{}
  }
}