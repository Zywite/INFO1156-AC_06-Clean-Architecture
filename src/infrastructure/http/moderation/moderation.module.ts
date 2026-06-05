import { Module } from "@nestjs/common"
import { ModerationController } from "./moderation.controller"
import { GetProhibitedWordsUseCase } from "@/application/use-cases/moderation/get-prohibited-words.use-case"
import { CreateProhibitedWordUseCase } from "@/application/use-cases/moderation/create-prohibited-word.use-case"
import { DeleteProhibitedWordUseCase } from "@/application/use-cases/moderation/delete-prohibited-word.use-case"

@Module({
    controllers: [ModerationController],
    providers: [
        GetProhibitedWordsUseCase,
        CreateProhibitedWordUseCase,
        DeleteProhibitedWordUseCase,
    ],
})
export class ModerationModule {}
