import { Like } from "@/domain/entities/like.entity"

export interface LikeRepository {
    save(like: Like): Promise<Like>
}
