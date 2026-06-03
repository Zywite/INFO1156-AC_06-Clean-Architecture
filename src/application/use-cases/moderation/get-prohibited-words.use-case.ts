import { ProhibitedWordRepository } from "@/domain/repositories/prohibited-word.repository"

export class GetProhibitedWordsUseCase {
    constructor(private readonly repo: ProhibitedWordRepository) {}
    async execute() { return this.repo.findAll() }
}
