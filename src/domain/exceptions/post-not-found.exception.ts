export class PostNotFoundException extends Error {
    constructor() {
        super("Post no encontrado")
        this.name = "PostNotFoundException"
    }
}
