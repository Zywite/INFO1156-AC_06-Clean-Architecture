import { Body, Controller, Param, Post } from "@nestjs/common"
import { AddLikeUseCase } from "@/application/use-cases/likes/add-like.use-case"
import { AddLikeRequestDto } from "./likes.dtos"

@Controller("api/posts/:id/likes")
export class LikesController {
    constructor(private readonly addLikeUseCase: AddLikeUseCase) {}

    @Post()
    async create(@Param("id") postId: string, @Body() body: AddLikeRequestDto) {
        return this.addLikeUseCase.execute(postId, body)
    }
}
