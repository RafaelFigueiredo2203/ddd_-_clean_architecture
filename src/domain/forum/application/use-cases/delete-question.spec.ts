import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepositories } from 'test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionsRepositories : InMemoryQuestionsRepositories
let sut : DeleteQuestionUseCase
describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepositories =  new InMemoryQuestionsRepositories()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepositories)

  })
  
  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question1'));

    console.log(newQuestion)
    
    await inMemoryQuestionsRepositories.create(newQuestion)
  
    await sut.execute({
      questionId: 'question1',
      authorId:'author-1'
    })
  
    expect(inMemoryQuestionsRepositories.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question1'));

    console.log(newQuestion)
    
    await inMemoryQuestionsRepositories.create(newQuestion)

  const result = await sut.execute({
    questionId: 'question1',
    authorId:'author-2'
  })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
  
})

