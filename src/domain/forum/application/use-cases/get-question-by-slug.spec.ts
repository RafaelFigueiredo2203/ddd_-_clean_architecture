import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepositories } from 'test/repositories/in-memory-questions-repository'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

let inMemoryQuestionsRepositories : InMemoryQuestionsRepositories
let sut : GetQuestionBySlugUseCase
describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepositories =  new InMemoryQuestionsRepositories()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepositories)

  })
  
  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question')
    });

    console.log(newQuestion)
    
    await inMemoryQuestionsRepositories.create(newQuestion)
  
    const result = await sut.execute({
      slug: 'example-question'
    })
  
    expect(result.value).toBeTruthy()
    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
      }),
    })
  })
  
})

