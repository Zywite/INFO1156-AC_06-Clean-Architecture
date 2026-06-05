import { Injectable } from "@nestjs/common"
import {
    PostRepository,
    PostWithInteractions,
} from "@/domain/repositories/post.repository"
import { Post } from "@/domain/entities/post.entity"
import { PostNotFoundException } from "@/domain/exceptions/post-not-found.exception"
import { PrismaService } from "@/infrastructure/persistence/prisma.service"

@Injectable()
export class PrismaPostRepository implements PostRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<Post[]> {
        const rows = await this.prisma.post.findMany({
            orderBy: { createdAt: "desc" },
        })
        return rows.map(
            (row) =>
                new Post({
                    id: row.id,
                    title: row.title,
                    description: row.description,
                    imageUrl: row.imageUrl,
                    categoryId: row.categoryId,
                    createdAt: row.createdAt,
                    updatedAt: row.updatedAt,
                }),
        )
    }

    async findById(id: string): Promise<Post | null> {
        const row = await this.prisma.post.findUnique({ where: { id } })
        return row ? new Post({ ...row }) : null
    }

    async findByIdOrThrow(id: string): Promise<Post> {
        const post = await this.findById(id)
        if (!post) throw new PostNotFoundException()
        return post
    }

    async findWithInteractions(
        categoryId?: string,
    ): Promise<PostWithInteractions[]> {
        const rows = await this.prisma.post.findMany({
            where: categoryId ? { categoryId } : undefined,
            include: { comments: true, likes: true, category: true },
        })
        return rows.map((row) => {
            const likesCount = row.likes.reduce((sum, l) => sum + l.weight, 0)
            const commentsCount = row.comments.length
            const hoursSinceCreation =
                (Date.now() - row.createdAt.getTime()) / 3600000
            let recencyBonus = 0
            if (hoursSinceCreation < 1) recencyBonus = 20
            else if (hoursSinceCreation < 24) recencyBonus = 10
            const relevanceScore =
                likesCount * 10 + commentsCount * 5 + recencyBonus

            return {
                id: row.id,
                title: row.title,
                description: row.description,
                imageUrl: row.imageUrl,
                categoryId: row.categoryId,
                createdAt: row.createdAt,
                updatedAt: row.updatedAt,
                categoryName: row.category?.name ?? null,
                likesCount,
                commentsCount,
                relevanceScore,
            }
        })
    }

    async save(post: Post): Promise<Post> {
        const row = await this.prisma.post.create({
            data: {
                title: post.title,
                description: post.description,
                imageUrl: post.imageUrl,
                categoryId: post.categoryId,
            },
        })
        return new Post({ ...row })
    }
}
