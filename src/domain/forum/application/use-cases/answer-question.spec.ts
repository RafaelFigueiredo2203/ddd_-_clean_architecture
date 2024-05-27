
import { InMemoryAnswersRepositories } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'


let inMemoryAnswersRepositories : InMemoryAnswersRepositories
let sut : AnswerQuestionUseCase
describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepositories =  new InMemoryAnswersRepositories()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepositories)
  })
  
  it(' should be able to create a answer', async () => {
  
    const result = await sut.execute({
      questionId:'1',
      instructorId:'1',
      content:'Conteudo da resposta'
    })
  
    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepositories.items[0]).toEqual(result.value?.answer)
  })
  
})

