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
  
    const {question} = await sut.execute({
      authorId:'1',
      title:'Nova pergunta',
      content:'Conteudo da pergunta'
    })
  
    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionsRepositories.items[0].id).toEqual(question.id)

  })
  
})

