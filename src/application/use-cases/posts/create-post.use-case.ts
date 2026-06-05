import { Inject } from "@nestjs/common"
import { PostRepository } from "@/domain/repositories/post.repository"
import { Post } from "@/domain/entities/post.entity"
import { CreatePostDto } from "@/application/dtos/posts/create-post.dto"
import { POST_REPOSITORY } from "@/domain/di.tokens"
import { ModerationGuard } from "@/application/services/moderation-guard.service"

export class CreatePostUseCase {
    constructor(
        @Inject(POST_REPOSITORY) private readonly postRepo: PostRepository,
        private readonly moderationGuard: ModerationGuard,
    ) {}

    async execute(dto: CreatePostDto): Promise<Post> {
        const textToModerate = `${dto.title} ${dto.description}`
        await this.moderationGuard.check(textToModerate)

        const post = new Post({
            title: dto.title,
            description: dto.description,
            imageUrl: dto.imageUrl,
            categoryId: dto.categoryId,
        })

        return this.postRepo.save(post)
    }
}
