import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { makeAnswer } from 'test/factories/make-answer'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAnswersRepositories } from 'test/repositories/in-memory-answers-repository'
import { InMemoryQuestionsRepositories } from 'test/repositories/in-memory-questions-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-answer-best'

let inMemoryQuestionsRepositories : InMemoryQuestionsRepositories
let inMemoryAnswersRepositories : InMemoryAnswersRepositories
let sut : ChooseQuestionBestAnswerUseCase
describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryQuestionsRepositories = new InMemoryQuestionsRepositories()
    inMemoryAnswersRepositories =  new InMemoryAnswersRepositories()
    sut = new ChooseQuestionBestAnswerUseCase(inMemoryAnswersRepositories,inMemoryQuestionsRepositories)

  })
  
  it('should be able to choose question best answer ', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id
    })

    await inMemoryQuestionsRepositories.create(question)
    await inMemoryAnswersRepositories.create(answer)
  
    await sut.execute({
      answerId: answer.id.toString(),
      authorId:question.authorId.toString()
    })
  
    expect(inMemoryQuestionsRepositories.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('should not be able to choose a best question answer from another user', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    })
    const answer = makeAnswer({
      questionId: question.id
    })

    await inMemoryQuestionsRepositories.create(question)
    await inMemoryAnswersRepositories.create(answer)
  
  expect(() => {
    return sut.execute({
      answerId: answer.id.toString(),
      authorId:'author-2'
    })
  }).rejects.toBeInstanceOf(Error)
  
  })
  
})
