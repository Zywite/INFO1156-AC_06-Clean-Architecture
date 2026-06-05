import { Controller, Get, Inject } from "@nestjs/common"
import { CategoryRepository } from "@/domain/repositories/category.repository"

@Controller("api/categories")
export class CategoriesController {
    constructor(
        @Inject("CategoryRepository")
        private readonly categoryRepo: CategoryRepository,
    ) {}

    @Get()
    async findAll() {
        return this.categoryRepo.findAll()
    }
}
