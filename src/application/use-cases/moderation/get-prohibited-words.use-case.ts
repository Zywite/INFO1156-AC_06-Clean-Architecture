import { Inject } from "@nestjs/common"
import { ProhibitedWordRepository } from "@/domain/repositories/prohibited-word.repository"

export class GetProhibitedWordsUseCase {
    constructor(@Inject("ProhibitedWordRepository") private readonly repo: ProhibitedWordRepository) {}
    async execute() { return this.repo.findAll() }
}
