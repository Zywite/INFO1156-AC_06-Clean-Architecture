import { LikeRepository } from "@/domain/repositories/like.repository"
import { PostRepository } from "@/domain/repositories/post.repository"
import { Like } from "@/domain/entities/like.entity"
import { AddLikeDto } from "@/application/dtos/likes/add-like.dto"

export class AddLikeUseCase {
    constructor(
        private readonly likeRepo: LikeRepository,
        private readonly postRepo: PostRepository,
    ) {}

    async execute(postId: string, dto: AddLikeDto): Promise<Like> {
        const post = await this.postRepo.findById(postId)
        if (!post) throw new Error("Post no encontrado")

        const like = new Like({
            postId,
            reactionType: dto.reactionType ?? "like",
            weight: dto.weight ?? 1,
        })

        if (!like.isValidWeight()) {
            throw new Error("El peso debe ser al menos 1")
        }

        return this.likeRepo.save(like)
    }
}
