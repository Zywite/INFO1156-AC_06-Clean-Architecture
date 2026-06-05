import { Inject } from "@nestjs/common"
import { ProhibitedWordRepository } from "@/domain/repositories/prohibited-word.repository"
import { PROHIBITED_WORD_REPOSITORY } from "@/domain/di.tokens"

export class DeleteProhibitedWordUseCase {
    constructor(
        @Inject(PROHIBITED_WORD_REPOSITORY)
        private readonly repo: ProhibitedWordRepository,
    ) {}
    async execute(id: string) {
        return this.repo.delete(id)
    }
}
