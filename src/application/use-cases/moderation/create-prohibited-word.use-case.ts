import { ProhibitedWordRepository } from "@/domain/repositories/prohibited-word.repository"
import { ProhibitedWord } from "@/domain/entities/prohibited-word.entity"

export class CreateProhibitedWordUseCase {
    constructor(private readonly repo: ProhibitedWordRepository) {}
    async execute(word: string, category: string) {
        const pw = new ProhibitedWord({ word, category })
        return this.repo.save(pw)
    }
}
