import { Comment } from "@/domain/entities/comment.entity"

export interface CommentRepository {
    findByPostId(postId: string): Promise<Comment[]>
    save(comment: Comment): Promise<Comment>
}
