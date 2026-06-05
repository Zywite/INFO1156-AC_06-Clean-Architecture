import { Module } from "@nestjs/common"
import { CommentsController } from "./comments.controller"
import { CreateCommentUseCase } from "@/application/use-cases/comments/create-comment.use-case"
import { GetCommentsUseCase } from "@/application/use-cases/comments/get-comments.use-case"
import { ModerationDomainService } from "@/domain/services/moderation.service"

@Module({
    controllers: [CommentsController],
    providers: [
        CreateCommentUseCase,
        GetCommentsUseCase,
        ModerationDomainService,
    ],
})
export class CommentsModule {}
