export type ReactionType = "like" | "fire" | "clap"

export type LikeProps = {
    id?: string
    postId: string
    reactionType?: ReactionType
    weight?: number
    createdAt?: Date
}

export class Like {
    id: string
    postId: string
    reactionType: ReactionType
    weight: number
    createdAt: Date

    constructor(props: LikeProps) {
        this.id = props.id ?? crypto.randomUUID()
        this.postId = props.postId
        this.reactionType = props.reactionType ?? "like"
        this.weight = props.weight ?? 1
        this.createdAt = props.createdAt ?? new Date()
    }

    isValidWeight(): boolean {
        return this.weight >= 1
    }
}
