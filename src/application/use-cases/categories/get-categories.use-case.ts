import { Inject } from "@nestjs/common"
import { CategoryRepository } from "@/domain/repositories/category.repository"
import { CATEGORY_REPOSITORY } from "@/domain/di.tokens"

export class GetCategoriesUseCase {
    constructor(
        @Inject(CATEGORY_REPOSITORY)
        private readonly categoryRepo: CategoryRepository,
    ) {}

    async execute() {
        return this.categoryRepo.findAll()
    }
}
