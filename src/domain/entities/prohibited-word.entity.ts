export type ProhibitedWordProps = {
    id?: string
    word: string
    category: string
    createdAt?: Date
}

export class ProhibitedWord {
    id: string
    word: string
    category: string
    createdAt: Date

    constructor(props: ProhibitedWordProps) {
        this.id = props.id ?? crypto.randomUUID()
        this.word = props.word
        this.category = props.category
        this.createdAt = props.createdAt ?? new Date()
    }
}
