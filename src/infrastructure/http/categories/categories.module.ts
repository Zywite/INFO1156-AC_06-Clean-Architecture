import { Module } from "@nestjs/common"
import { CategoriesController } from "./categories.controller"
import { GetCategoriesUseCase } from "@/application/use-cases/categories/get-categories.use-case"

@Module({
    controllers: [CategoriesController],
    providers: [GetCategoriesUseCase],
})
export class CategoriesModule {}
