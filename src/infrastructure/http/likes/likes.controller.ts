import {
    Body,
    Controller,
    Param,
    Post,
    BadRequestException,
    NotFoundException,
} from "@nestjs/common"
import { AddLikeUseCase } from "@/application/use-cases/likes/add-like.use-case"
import { AddLikeRequestDto } from "./likes.dtos"
import { PostNotFoundException } from "@/domain/exceptions/post-not-found.exception"
import { InvalidWeightException } from "@/domain/exceptions/invalid-weight.exception"

@Controller("api/posts/:id/likes")
export class LikesController {
    constructor(private readonly addLikeUseCase: AddLikeUseCase) {}

    @Post()
    async create(@Param("id") postId: string, @Body() body: AddLikeRequestDto) {
        try {
            const like = await this.addLikeUseCase.execute(postId, body)
            return { data: like }
        } catch (e: unknown) {
            if (e instanceof PostNotFoundException) {
                throw new NotFoundException(e.message)
            }
            if (e instanceof InvalidWeightException) {
                throw new BadRequestException(e.message)
            }
            throw e
        }
    }
}
