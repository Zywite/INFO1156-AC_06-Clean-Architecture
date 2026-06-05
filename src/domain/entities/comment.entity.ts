export type CommentProps = {
    id?: string
    postId: string
    content: string
    createdAt?: Date
}

export class Comment {
    id: string
    postId: string
    content: string
    createdAt: Date

    constructor(props: CommentProps) {
        this.id = props.id ?? crypto.randomUUID()
        this.postId = props.postId
        this.content = props.content
        this.createdAt = props.createdAt ?? new Date()
    }
}
