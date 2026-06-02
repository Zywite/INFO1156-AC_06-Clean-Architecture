export type PostProps = {
    id?: string
    title: string
    description: string
    imageUrl: string
    categoryId?: string | null
    createdAt?: Date
    updatedAt?: Date
}

export class Post {
    id: string
    title: string
    description: string
    imageUrl: string
    categoryId: string | null
    createdAt: Date
    updatedAt: Date

    constructor(props: PostProps) {
        this.id = props.id ?? crypto.randomUUID()
        this.title = props.title
        this.description = props.description
        this.imageUrl = props.imageUrl
        this.categoryId = props.categoryId ?? null
        this.createdAt = props.createdAt ?? new Date()
        this.updatedAt = props.updatedAt ?? new Date()
    }

    hasValidTitle(): boolean {
        return this.title.length >= 3 && this.title.length <= 120
    }

    belongsToCategory(): boolean {
        return this.categoryId !== null
    }
}
