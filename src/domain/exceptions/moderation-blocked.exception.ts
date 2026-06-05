export class ModerationBlockedException extends Error {
    constructor(reason?: string) {
        super(reason ?? "Contenido bloqueado por moderación")
        this.name = "ModerationBlockedException"
    }
}
