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
        const words = await this.getProhibitedWordsUseCase.execute()
        return { data: words, total: words.length }
    }

    @Post()
    async create(@Body() body: CreateProhibitedWordRequestDto) {
        const word = await this.createProhibitedWordUseCase.execute(
            body.word,
            body.category,
        )
        return { data: word }
    }

    @Delete(":id")
    async delete(@Param("id") id: string) {
        await this.deleteProhibitedWordUseCase.execute(id)
        return { data: null }
    }
}
