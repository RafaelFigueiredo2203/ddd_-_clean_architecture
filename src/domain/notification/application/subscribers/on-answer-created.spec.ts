import { makeAnswer } from "test/factories/make-answer"
import { InMemoryAnswerAttachmentsRepositories } from "test/repositories/in-memory-answer-attachments-repository"
import { InMemoryAnswersRepositories } from "test/repositories/in-memory-answers-repository"
import { OnAnswerCreated } from "./on-answer-created"

let inMemoryAnswerAttachmentsRepositories: InMemoryAnswerAttachmentsRepositories
let inMemoryAnswersRepositories : InMemoryAnswersRepositories

describe('On Answer Created', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepositories = new InMemoryAnswerAttachmentsRepositories()
    inMemoryAnswersRepositories = new InMemoryAnswersRepositories(inMemoryAnswerAttachmentsRepositories)
  })
  it('should send a notification when an answer is created' ,() => {
    const onAnswerCreated = new OnAnswerCreated()

    const answer = makeAnswer()

    inMemoryAnswersRepositories.create(answer)
  })
})