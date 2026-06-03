import { Global, Module } from "@nestjs/common"
import { PrismaService } from "./prisma.service"
import { PrismaPostRepository } from "./prisma-post.repository"
import { PrismaCommentRepository } from "./prisma-comment.repository"
import { PrismaLikeRepository } from "./prisma-like.repository"
import { PrismaCategoryRepository } from "./prisma-category.repository"
import { PrismaProhibitedWordRepository } from "./prisma-prohibited-word.repository"

@Global()
@Module({
    providers: [
        PrismaService,
        { provide: "PostRepository", useClass: PrismaPostRepository },
        { provide: "CommentRepository", useClass: PrismaCommentRepository },
        { provide: "LikeRepository", useClass: PrismaLikeRepository },
        { provide: "CategoryRepository", useClass: PrismaCategoryRepository },
        { provide: "ProhibitedWordRepository", useClass: PrismaProhibitedWordRepository },
    ],
    exports: [
        PrismaService,
        "PostRepository",
        "CommentRepository",
        "LikeRepository",
        "CategoryRepository",
        "ProhibitedWordRepository",
    ],
})
export class PrismaModule {}
