import { Inject } from "@nestjs/common"
import { ProhibitedWordRepository } from "@/domain/repositories/prohibited-word.repository"

export class DeleteProhibitedWordUseCase {
    constructor(
        @Inject("ProhibitedWordRepository")
        private readonly repo: ProhibitedWordRepository,
    ) {}
    async execute(id: string) {
        return this.repo.delete(id)
    }
}
