import { Inject } from "@nestjs/common"
import { CommentRepository } from "@/domain/repositories/comment.repository"
import { PostRepository } from "@/domain/repositories/post.repository"
import { COMMENT_REPOSITORY, POST_REPOSITORY } from "@/domain/di.tokens"

export class GetCommentsUseCase {
    constructor(
        @Inject(COMMENT_REPOSITORY)
        private readonly commentRepo: CommentRepository,
        @Inject(POST_REPOSITORY) private readonly postRepo: PostRepository,
    ) {}

    async execute(postId: string) {
        await this.postRepo.findByIdOrThrow(postId)
        return this.commentRepo.findByPostId(postId)
    }
}
