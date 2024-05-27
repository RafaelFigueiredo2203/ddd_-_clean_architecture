import { InMemoryQuestionsRepositories } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionsRepositories : InMemoryQuestionsRepositories
let sut : CreateQuestionUseCase
describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepositories =  new InMemoryQuestionsRepositories()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepositories)

  })
  
  it(' should be able to create a question', async () => {
  
    const result = await sut.execute({
      authorId:'1',
      title:'Nova pergunta',
      content:'Conteudo da pergunta'
    })
  
    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepositories.items[0]).toEqual(result.value?.question)

  })
  
})

