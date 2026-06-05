import { Inject } from "@nestjs/common"
import { CommentRepository } from "@/domain/repositories/comment.repository"
import { PostRepository } from "@/domain/repositories/post.repository"
import { ProhibitedWordRepository } from "@/domain/repositories/prohibited-word.repository"
import { ModerationDomainService } from "@/domain/services/moderation.service"
import { Comment } from "@/domain/entities/comment.entity"
import { CreateCommentDto } from "@/application/dtos/comments/create-comment.dto"

export class CreateCommentUseCase {
    constructor(
        @Inject("CommentRepository")
        private readonly commentRepo: CommentRepository,
        @Inject("PostRepository") private readonly postRepo: PostRepository,
        @Inject("ProhibitedWordRepository")
        private readonly prohibitedWordRepo: ProhibitedWordRepository,
        private readonly moderationService: ModerationDomainService,
    ) {}

    async execute(postId: string, dto: CreateCommentDto): Promise<Comment> {
        const post = await this.postRepo.findById(postId)
        if (!post) throw new Error("Post no encontrado")

        const prohibitedWords = await this.prohibitedWordRepo.findAll()
        const result = this.moderationService.moderate(
            dto.content,
            prohibitedWords,
        )
        if (!result.approved) {
            throw new Error(
                result.reason ?? "Comentario bloqueado por moderación",
            )
        }

        const comment = new Comment({ postId, content: dto.content })
        return this.commentRepo.save(comment)
    }
}
