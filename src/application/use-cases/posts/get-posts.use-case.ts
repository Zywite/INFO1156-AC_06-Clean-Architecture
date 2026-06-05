import { Inject } from "@nestjs/common"
import { PostRepository } from "@/domain/repositories/post.repository"

export class GetPostsUseCase {
    constructor(
        @Inject("PostRepository") private readonly postRepo: PostRepository,
    ) {}

    async execute() {
        return this.postRepo.findAll()
    }
}
