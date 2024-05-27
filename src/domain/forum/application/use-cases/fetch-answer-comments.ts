
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentRepository } from '../repositories/answer-comments-repository';

interface FetchAnswerCommentUseCaseRequest {
  answerId:string
  page:number
}

interface FetchAnswerCommentUseCaseResponse {
  answerComments:AnswerComment[]
}


export class FetchAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) {}

  async execute({
   page,
   answerId
  }: FetchAnswerCommentUseCaseRequest):Promise<FetchAnswerCommentUseCaseResponse> {
    const answerComments = await this.answerCommentRepository.findManyByAnswerId(answerId,{page})

    return {answerComments}
  }
}
