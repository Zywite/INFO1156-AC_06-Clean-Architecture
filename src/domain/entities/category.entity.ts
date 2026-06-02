export type CategoryProps = {
    id?: string
    name: string
    slug: string
}

export class Category {
    id: string
    name: string
    slug: string

    constructor(props: CategoryProps) {
        this.id = props.id ?? crypto.randomUUID()
        this.name = props.name
        this.slug = props.slug
    }
}
