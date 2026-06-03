import { Module } from "@nestjs/common"
import { LikesController } from "./likes.controller"
import { AddLikeUseCase } from "@/application/use-cases/likes/add-like.use-case"

@Module({
    controllers: [LikesController],
    providers: [AddLikeUseCase],
})
export class LikesModule {}
