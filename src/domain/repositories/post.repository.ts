import { Post } from "@/domain/entities/post.entity"

export type PostWithInteractions = {
    id: string
    title: string
    description: string
    imageUrl: string
    categoryId: string | null
    createdAt: Date
    updatedAt: Date
    likesCount: number
    commentsCount: number
    relevanceScore: number
    categoryName: string | null
}

export interface PostRepository {
    findAll(): Promise<Post[]>
    findById(id: string): Promise<Post | null>
    findByCategory(categoryId: string): Promise<Post[]>
    findWithInteractions(categoryId?: string): Promise<PostWithInteractions[]>
    save(post: Post): Promise<Post>
    delete(id: string): Promise<void>
}
