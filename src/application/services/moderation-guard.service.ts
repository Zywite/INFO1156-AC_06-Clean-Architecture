import { Inject, Injectable } from "@nestjs/common"
import { ProhibitedWordRepository } from "@/domain/repositories/prohibited-word.repository"
import { ModerationDomainService } from "@/domain/services/moderation.service"
import { ModerationBlockedException } from "@/domain/exceptions/moderation-blocked.exception"
import { PROHIBITED_WORD_REPOSITORY } from "@/domain/di.tokens"

@Injectable()
export class ModerationGuard {
    constructor(
        @Inject(PROHIBITED_WORD_REPOSITORY)
        private readonly prohibitedWordRepo: ProhibitedWordRepository,
        private readonly moderationService: ModerationDomainService,
    ) {}

    async check(text: string): Promise<void> {
        const prohibitedWords = await this.prohibitedWordRepo.findAll()
        const result = this.moderationService.moderate(text, prohibitedWords)
        if (!result.approved) {
            throw new ModerationBlockedException(result.reason)
        }
    }
}
