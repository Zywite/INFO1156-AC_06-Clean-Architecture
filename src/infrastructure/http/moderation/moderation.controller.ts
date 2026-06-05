import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common"
import { GetProhibitedWordsUseCase } from "@/application/use-cases/moderation/get-prohibited-words.use-case"
import { CreateProhibitedWordUseCase } from "@/application/use-cases/moderation/create-prohibited-word.use-case"
import { DeleteProhibitedWordUseCase } from "@/application/use-cases/moderation/delete-prohibited-word.use-case"
import { CreateProhibitedWordRequestDto } from "./moderation.dtos"

@Controller("api/admin/prohibited-words")
export class ModerationController {
    constructor(
        private readonly getProhibitedWordsUseCase: GetProhibitedWordsUseCase,
        private readonly createProhibitedWordUseCase: CreateProhibitedWordUseCase,
        private readonly deleteProhibitedWordUseCase: DeleteProhibitedWordUseCase,
    ) {}

    @Get()
    async findAll() {
        return this.getProhibitedWordsUseCase.execute()
    }

    @Post()
    async create(@Body() body: CreateProhibitedWordRequestDto) {
        return this.createProhibitedWordUseCase.execute(
            body.word,
            body.category,
        )
    }

    @Delete(":id")
    async delete(@Param("id") id: string) {
        return this.deleteProhibitedWordUseCase.execute(id)
    }
}
