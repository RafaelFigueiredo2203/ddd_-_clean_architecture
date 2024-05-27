import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepositories } from 'test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswersRepositories : InMemoryAnswersRepositories
let sut : DeleteAnswerUseCase
describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepositories =  new InMemoryAnswersRepositories()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepositories)

  })
  
  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('answer1'));

    console.log(newAnswer)
    
    await inMemoryAnswersRepositories.create(newAnswer)
  
    await sut.execute({
      answerId: 'answer1',
      authorId:'author-1'
    })
  
    expect(inMemoryAnswersRepositories.items).toHaveLength(0)
  })

  it('should not be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('answer1'));

    console.log(newAnswer)
    
    await inMemoryAnswersRepositories.create(newAnswer)

    const result = await sut.execute({
      answerId: 'answer1',
      authorId:'author-2'
    })
  
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  
  })
  
})

