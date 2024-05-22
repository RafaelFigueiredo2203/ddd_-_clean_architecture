import { Answer } from '../entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

const fakeAnswerRepository: AnswersRepository = {
  create: async (answer: Answer) => {},
}

test('create a answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})
