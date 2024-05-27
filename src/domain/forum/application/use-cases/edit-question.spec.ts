import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepositories } from 'test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionsRepositories : InMemoryQuestionsRepositories
let sut : EditQuestionUseCase
describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepositories =  new InMemoryQuestionsRepositories()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepositories)

  })
  
  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question1'));

    console.log(newQuestion)
    
    await inMemoryQuestionsRepositories.create(newQuestion)
  
    await sut.execute({
      authorId:'author-1',
      title:'Pergunta teste',
      content:'Conteudo teste',
      questionId: newQuestion.id.toValue()
    })
  
    expect(inMemoryQuestionsRepositories.items[0]).toMatchObject({
      title:'Pergunta teste',
      content:'Conteudo teste',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question1'));

    console.log(newQuestion)
    
    await inMemoryQuestionsRepositories.create(newQuestion)
  const result = await sut.execute({
    authorId:'author-2',
    title:'Pergunta teste',
    content:'Conteudo teste',
    questionId: newQuestion.id.toValue()
  })

  expect(result.isLeft()).toBe(true)
  expect(result.value).toBeInstanceOf(NotAllowedError)
  })
  
})

