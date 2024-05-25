
import { makeAnswer } from 'test/factories/make-answer'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionCommentRepositories } from 'test/repositories/in-memory-question-comments'
import { InMemoryQuestionsRepositories } from 'test/repositories/in-memory-questions-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'

let inMemoryQuestionsRepositories : InMemoryQuestionsRepositories
let inMemoryQuestionCommentRepositories : InMemoryQuestionCommentRepositories
let sut : CommentOnQuestionUseCase
describe('Comment on question ', () => {
  beforeEach(() => {
    inMemoryQuestionsRepositories = new InMemoryQuestionsRepositories()
    inMemoryQuestionCommentRepositories =  new InMemoryQuestionCommentRepositories()
    sut = new CommentOnQuestionUseCase(inMemoryQuestionsRepositories,inMemoryQuestionCommentRepositories )

  })
  
  it('should be able to comment on question ', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id
    })

    await inMemoryQuestionsRepositories.create(question)
    
  
    await sut.execute({
      questionId: question.id.toString(),
      authorId:question.authorId.toString(),
      content:'Teste',
    })
  
    expect(inMemoryQuestionCommentRepositories.items[0].content).toEqual('Teste')
  })

  
})

