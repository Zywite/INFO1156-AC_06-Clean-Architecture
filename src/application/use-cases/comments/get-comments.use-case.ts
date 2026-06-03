import { Inject } from "@nestjs/common"
import { CommentRepository } from "@/domain/repositories/comment.repository"
import { PostRepository } from "@/domain/repositories/post.repository"

export class GetCommentsUseCase {
    constructor(
        @Inject("CommentRepository") private readonly commentRepo: CommentRepository,
        @Inject("PostRepository") private readonly postRepo: PostRepository,
    ) {}

    async execute(postId: string) {
        const post = await this.postRepo.findById(postId)
        if (!post) throw new Error("Post no encontrado")
        return this.commentRepo.findByPostId(postId)
    }
}
