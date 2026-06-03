import { PostRepository } from "@/domain/repositories/post.repository"

export class GetPostsUseCase {
    constructor(private readonly postRepo: PostRepository) {}

    async execute() {
        return this.postRepo.findAll()
    }
}
