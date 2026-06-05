import { IsIn, IsInt, IsOptional, IsString, Min } from "class-validator"
import { ReactionType } from "@/domain/entities/like.entity"

export class AddLikeRequestDto {
    @IsOptional()
    @IsString({ message: "El tipo de reacción debe ser un texto" })
    @IsIn(["like", "fire", "clap"], {
        message: "Tipo de reacción no válida (like, fire, clap)",
    })
    reactionType?: ReactionType

    @IsOptional()
    @IsInt({ message: "El peso debe ser un número entero" })
    @Min(1, { message: "El peso debe ser al menos 1" })
    weight?: number
}
