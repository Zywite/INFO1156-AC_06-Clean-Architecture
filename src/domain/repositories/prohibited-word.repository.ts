import { ProhibitedWord } from "@/domain/entities/prohibited-word.entity"

export interface ProhibitedWordRepository {
    findAll(): Promise<ProhibitedWord[]>
    save(word: ProhibitedWord): Promise<ProhibitedWord>
    delete(id: string): Promise<void>
}
