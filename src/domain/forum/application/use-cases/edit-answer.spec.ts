import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepositories } from 'test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswersRepositories : InMemoryAnswersRepositories
let sut : EditAnswerUseCase
describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepositories =  new InMemoryAnswersRepositories()
    sut = new EditAnswerUseCase(inMemoryAnswersRepositories)

  })
  
  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('answer1'));

    console.log(newAnswer)
    
    await inMemoryAnswersRepositories.create(newAnswer)
  
    await sut.execute({
      authorId:'author-1',
      content:'Conteudo teste',
      answerId: newAnswer.id.toValue()
    })
  
    expect(inMemoryAnswersRepositories.items[0]).toMatchObject({
      content:'Conteudo teste',
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('answer1'));

    console.log(newAnswer)
    
    await inMemoryAnswersRepositories.create(newAnswer)
  const result = await sut.execute({
    authorId:'author-2',
    content:'Conteudo teste',
    answerId: newAnswer.id.toValue()
  })

  expect(result.isLeft()).toBe(true)
  expect(result.value).toBeInstanceOf(NotAllowedError)
  })
  
})

