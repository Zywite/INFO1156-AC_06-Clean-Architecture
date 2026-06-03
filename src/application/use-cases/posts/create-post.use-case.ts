import { PostRepository } from "@/domain/repositories/post.repository"
import { ProhibitedWordRepository } from "@/domain/repositories/prohibited-word.repository"
import { ModerationDomainService } from "@/domain/services/moderation.service"
import { Post } from "@/domain/entities/post.entity"
import { CreatePostDto } from "@/application/dtos/posts/create-post.dto"

export class CreatePostUseCase {
    constructor(
        private readonly postRepo: PostRepository,
        private readonly prohibitedWordRepo: ProhibitedWordRepository,
        private readonly moderationService: ModerationDomainService,
    ) {}

    async execute(dto: CreatePostDto): Promise<Post> {
        const prohibitedWords = await this.prohibitedWordRepo.findAll()
        const textToModerate = `${dto.title} ${dto.description}`
        const result = this.moderationService.moderate(textToModerate, prohibitedWords)

        if (!result.approved) {
            throw new Error(result.reason ?? "Post bloqueado por moderación")
        }

        const post = new Post({
            title: dto.title,
            description: dto.description,
            imageUrl: dto.imageUrl,
            categoryId: dto.categoryId,
        })

        return this.postRepo.save(post)
    }
}
