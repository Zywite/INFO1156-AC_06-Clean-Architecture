import { Inject } from "@nestjs/common"
import { ProhibitedWordRepository } from "@/domain/repositories/prohibited-word.repository"
import { PROHIBITED_WORD_REPOSITORY } from "@/domain/di.tokens"

export class GetProhibitedWordsUseCase {
    constructor(
        @Inject(PROHIBITED_WORD_REPOSITORY)
        private readonly repo: ProhibitedWordRepository,
    ) {}
    async execute() {
        return this.repo.findAll()
    }
}
