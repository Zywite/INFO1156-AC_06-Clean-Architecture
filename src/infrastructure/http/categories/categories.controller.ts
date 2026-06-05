import { Controller, Get } from "@nestjs/common"
import { GetCategoriesUseCase } from "@/application/use-cases/categories/get-categories.use-case"

@Controller("api/categories")
export class CategoriesController {
    constructor(private readonly getCategoriesUseCase: GetCategoriesUseCase) {}

    @Get()
    async findAll() {
        const categories = await this.getCategoriesUseCase.execute()
        return { data: categories, total: categories.length }
    }
}
