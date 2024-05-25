
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
  
    const {answer} = await sut.execute({
      questionId:'1',
      instructorId:'1',
      content:'Conteudo da resposta'
    })
  
    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswersRepositories.items[0].id).toEqual(answer.id)
  })
  
})

