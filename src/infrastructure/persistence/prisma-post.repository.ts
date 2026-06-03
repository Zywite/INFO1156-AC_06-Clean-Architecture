import { Injectable } from "@nestjs/common"
import { PostRepository, PostWithInteractions } from "@/domain/repositories/post.repository"
import { Post } from "@/domain/entities/post.entity"
import { PrismaService } from "@/infrastructure/persistence/prisma.service"

@Injectable()
export class PrismaPostRepository implements PostRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<Post[]> {
        const rows = await this.prisma.post.findMany({ orderBy: { createdAt: "desc" } })
        return rows.map(row => new Post({ id: row.id, title: row.title, description: row.description, imageUrl: row.imageUrl, categoryId: row.categoryId, createdAt: row.createdAt, updatedAt: row.updatedAt }))
    }

    async findById(id: string): Promise<Post | null> {
        const row = await this.prisma.post.findUnique({ where: { id } })
        return row ? new Post({ ...row }) : null
    }

    async findByCategory(categoryId: string): Promise<Post[]> {
        const rows = await this.prisma.post.findMany({ where: { categoryId } })
        return rows.map(row => new Post({ ...row }))
    }

    async findWithInteractions(categoryId?: string): Promise<PostWithInteractions[]> {
        const rows = await this.prisma.post.findMany({
            where: categoryId ? { categoryId } : undefined,
            include: { comments: true, likes: true, category: true },
        })
        return rows.map(row => ({
            id: row.id, title: row.title, description: row.description,
            imageUrl: row.imageUrl, categoryId: row.categoryId,
            createdAt: row.createdAt, updatedAt: row.updatedAt,
            categoryName: row.category?.name ?? null,
            likesCount: row.likes.reduce((sum, l) => sum + l.weight, 0),
            commentsCount: row.comments.length,
            relevanceScore: 0,
        }))
    }

    async save(post: Post): Promise<Post> {
        const row = await this.prisma.post.create({ data: { title: post.title, description: post.description, imageUrl: post.imageUrl, categoryId: post.categoryId } })
        return new Post({ ...row })
    }

    async delete(id: string): Promise<void> {
        await this.prisma.post.delete({ where: { id } })
    }
}