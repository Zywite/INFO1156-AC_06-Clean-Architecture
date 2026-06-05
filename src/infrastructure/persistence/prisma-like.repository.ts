import { Injectable } from "@nestjs/common"
import { LikeRepository } from "@/domain/repositories/like.repository"
import { Like, ReactionType } from "@/domain/entities/like.entity"
import { PrismaService } from "@/infrastructure/persistence/prisma.service"

@Injectable()
export class PrismaLikeRepository implements LikeRepository {
    constructor(private readonly prisma: PrismaService) {}
    async save(like: Like): Promise<Like> {
        const row = await this.prisma.like.create({
            data: {
                postId: like.postId,
                reactionType: like.reactionType,
                weight: like.weight,
                source: "likes-module",
            },
        })
        return new Like({
            ...row,
            reactionType: row.reactionType as ReactionType,
        })
    }
}
