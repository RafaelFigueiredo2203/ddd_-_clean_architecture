
import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';

interface FetchRecenteQuestionsUseCaseRequest {
  page:number
}

interface FetchRecenteQuestionsUseCaseResponse {
  questions:Question[]
}


export class FetchRecenteQuestionsUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
   page
  }: FetchRecenteQuestionsUseCaseRequest):Promise<FetchRecenteQuestionsUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({page})

    return {questions}
  }
}
