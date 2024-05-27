
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentRepositories } from 'test/repositories/in-memory-question-comments'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'

let inMemoryQuestionCommentRepositories : InMemoryQuestionCommentRepositories
let sut : DeleteQuestionCommentUseCase
describe('Delete question comment ', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepositories =  new InMemoryQuestionCommentRepositories()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentRepositories )

  })
  
  it('should be able to delete a question comment ', async () => {
    const questionComment = makeQuestionComment()
  

    await inMemoryQuestionCommentRepositories.create(questionComment)
    
  
    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId:questionComment.authorId.toString()
    })
  
    expect(inMemoryQuestionCommentRepositories.items).toHaveLength(0)
  })

  it('should not be able to delete another user question comment ', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityId('author-1')
    })
  

    await inMemoryQuestionCommentRepositories.create(questionComment)
    
    expect(() =>{
      return sut.execute({
        questionCommentId: questionComment.id.toString(),
        authorId:'author-2'
      })
    }).rejects.toBeInstanceOf(Error)
  })

  
})

