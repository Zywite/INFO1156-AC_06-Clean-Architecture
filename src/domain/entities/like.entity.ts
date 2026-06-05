export type ReactionType = "like" | "fire" | "clap"

const REACTION_VALUES: readonly ReactionType[] = ["like", "fire", "clap"]

export function isReactionType(value: string): value is ReactionType {
    return (REACTION_VALUES as readonly string[]).includes(value)
}

export type LikeProps = {
    id?: string
    postId: string
    reactionType?: ReactionType
    weight?: number
    source?: string
    createdAt?: Date
}

export class Like {
    id: string
    postId: string
    reactionType: ReactionType
    weight: number
    source: string
    createdAt: Date

    constructor(props: LikeProps) {
        this.id = props.id ?? crypto.randomUUID()
        this.postId = props.postId
        this.reactionType = props.reactionType ?? "like"
        this.weight = props.weight ?? 1
        this.source = props.source ?? "likes-module"
        this.createdAt = props.createdAt ?? new Date()
    }

    isValidWeight(): boolean {
        return this.weight >= 1
    }
}
