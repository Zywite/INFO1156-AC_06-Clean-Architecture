import { Inject } from "@nestjs/common"
import { ProhibitedWordRepository } from "@/domain/repositories/prohibited-word.repository"
import { ProhibitedWord } from "@/domain/entities/prohibited-word.entity"
import { PROHIBITED_WORD_REPOSITORY } from "@/domain/di.tokens"

export class CreateProhibitedWordUseCase {
    constructor(
        @Inject(PROHIBITED_WORD_REPOSITORY)
        private readonly repo: ProhibitedWordRepository,
    ) {}
    async execute(word: string, category: string) {
        const pw = new ProhibitedWord({ word, category })
        return this.repo.save(pw)
    }
}
