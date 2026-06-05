import { Inject } from "@nestjs/common"
import { PostRepository } from "@/domain/repositories/post.repository"
import { POST_REPOSITORY } from "@/domain/di.tokens"

export class GetPostsUseCase {
    constructor(
        @Inject(POST_REPOSITORY) private readonly postRepo: PostRepository,
    ) {}

    async execute() {
        return this.postRepo.findAll()
    }
}
