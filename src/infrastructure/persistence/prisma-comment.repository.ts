import { Injectable } from "@nestjs/common"
import { CommentRepository } from "@/domain/repositories/comment.repository"
import { Comment } from "@/domain/entities/comment.entity"
import { PrismaService } from "@/infrastructure/persistence/prisma.service"

@Injectable()
export class PrismaCommentRepository implements CommentRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findByPostId(postId: string): Promise<Comment[]> {
        const rows = await this.prisma.comment.findMany({
            where: { postId },
            orderBy: { createdAt: "desc" },
        })
        return rows.map(
            (row) =>
                new Comment({
                    id: row.id,
                    postId: row.postId,
                    content: row.content,
                    createdAt: row.createdAt,
                }),
        )
    }

    async save(comment: Comment): Promise<Comment> {
        const row = await this.prisma.comment.create({
            data: {
                postId: comment.postId,
                content: comment.content,
                source: "comments-module",
            },
        })
        return new Comment({ ...row })
    }
}
