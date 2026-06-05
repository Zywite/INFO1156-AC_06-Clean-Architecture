import { Global, Module } from "@nestjs/common"
import { PrismaService } from "./prisma.service"
import { PrismaPostRepository } from "./prisma-post.repository"
import { PrismaCommentRepository } from "./prisma-comment.repository"
import { PrismaLikeRepository } from "./prisma-like.repository"
import { PrismaCategoryRepository } from "./prisma-category.repository"
import { PrismaProhibitedWordRepository } from "./prisma-prohibited-word.repository"
import {
    POST_REPOSITORY,
    COMMENT_REPOSITORY,
    LIKE_REPOSITORY,
    CATEGORY_REPOSITORY,
    PROHIBITED_WORD_REPOSITORY,
} from "@/domain/di.tokens"
import { ModerationDomainService } from "@/domain/services/moderation.service"

@Global()
@Module({
    providers: [
        PrismaService,
        ModerationDomainService,
        { provide: POST_REPOSITORY, useClass: PrismaPostRepository },
        { provide: COMMENT_REPOSITORY, useClass: PrismaCommentRepository },
        { provide: LIKE_REPOSITORY, useClass: PrismaLikeRepository },
        { provide: CATEGORY_REPOSITORY, useClass: PrismaCategoryRepository },
        {
            provide: PROHIBITED_WORD_REPOSITORY,
            useClass: PrismaProhibitedWordRepository,
        },
    ],
    exports: [
        PrismaService,
        ModerationDomainService,
        POST_REPOSITORY,
        COMMENT_REPOSITORY,
        LIKE_REPOSITORY,
        CATEGORY_REPOSITORY,
        PROHIBITED_WORD_REPOSITORY,
    ],
})
export class PrismaModule {}
