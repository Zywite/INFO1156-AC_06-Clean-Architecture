export class InvalidWeightException extends Error {
    constructor() {
        super("El peso debe ser al menos 1")
        this.name = "InvalidWeightException"
    }
}
