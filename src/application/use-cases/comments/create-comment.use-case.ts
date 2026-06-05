import { Inject } from "@nestjs/common"
import { CommentRepository } from "@/domain/repositories/comment.repository"
import { PostRepository } from "@/domain/repositories/post.repository"
import { Comment } from "@/domain/entities/comment.entity"
import { CreateCommentDto } from "@/application/dtos/comments/create-comment.dto"
import { COMMENT_REPOSITORY, POST_REPOSITORY } from "@/domain/di.tokens"
import { ModerationGuard } from "@/application/services/moderation-guard.service"

export class CreateCommentUseCase {
    constructor(
        @Inject(COMMENT_REPOSITORY)
        private readonly commentRepo: CommentRepository,
        @Inject(POST_REPOSITORY) private readonly postRepo: PostRepository,
        private readonly moderationGuard: ModerationGuard,
    ) {}

    async execute(postId: string, dto: CreateCommentDto): Promise<Comment> {
        await this.postRepo.findByIdOrThrow(postId)

        await this.moderationGuard.check(dto.content)

        const comment = new Comment({ postId, content: dto.content })
        return this.commentRepo.save(comment)
    }
}
