import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsRepositories } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionsRepositories : InMemoryQuestionsRepositories
let sut : CreateQuestionUseCase
describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepositories =  new InMemoryQuestionsRepositories()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepositories)

  })
  
  it(' should be able to create a question with attachment', async () => {
  
    const result = await sut.execute({
      authorId:'1',
      title:'Nova pergunta',
      content:'Conteudo da pergunta',
      attachmentsIds: ['1','2'],
    })
  
    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepositories.items[0]).toEqual(result.value?.question)
    expect(inMemoryQuestionsRepositories.items[0].attachments.currentItems).toHaveLength(2)
    expect(inMemoryQuestionsRepositories.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
    ])
  })
})

