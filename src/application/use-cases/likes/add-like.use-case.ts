import { Inject } from "@nestjs/common"
import { LikeRepository } from "@/domain/repositories/like.repository"
import { PostRepository } from "@/domain/repositories/post.repository"
import { Like, isReactionType } from "@/domain/entities/like.entity"
import { AddLikeDto } from "@/application/dtos/likes/add-like.dto"
import { InvalidWeightException } from "@/domain/exceptions/invalid-weight.exception"
import { LIKE_REPOSITORY, POST_REPOSITORY } from "@/domain/di.tokens"

export class AddLikeUseCase {
    constructor(
        @Inject(LIKE_REPOSITORY) private readonly likeRepo: LikeRepository,
        @Inject(POST_REPOSITORY) private readonly postRepo: PostRepository,
    ) {}

    async execute(postId: string, dto: AddLikeDto): Promise<Like> {
        await this.postRepo.findByIdOrThrow(postId)

        const reactionType =
            dto.reactionType !== undefined && isReactionType(dto.reactionType)
                ? dto.reactionType
                : "like"
        const like = new Like({
            postId,
            reactionType,
            weight: dto.weight ?? 1,
        })

        if (!like.isValidWeight()) {
            throw new InvalidWeightException()
        }

        return this.likeRepo.save(like)
    }
}
