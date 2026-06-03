import { Body, Controller, Get, Param, Post, BadRequestException, NotFoundException } from "@nestjs/common"
import { CreateCommentUseCase } from "@/application/use-cases/comments/create-comment.use-case"
import { GetCommentsUseCase } from "@/application/use-cases/comments/get-comments.use-case"
import { CreateCommentRequestDto } from "./comments.dtos"

@Controller("api/posts/:id/comments")
export class CommentsController {
    constructor(
        private readonly createCommentUseCase: CreateCommentUseCase,
        private readonly getCommentsUseCase: GetCommentsUseCase,
    ) {}

    @Post()
    async create(@Param("id") postId: string, @Body() body: CreateCommentRequestDto) {
        try {
            return await this.createCommentUseCase.execute(postId, body)
        } catch (e: any) {
            if (e.message === "Post no encontrado") throw new NotFoundException(e.message)
            throw new BadRequestException(e.message)
        }
    }

    @Get()
    async list(@Param("id") postId: string) {
        try {
            const comments = await this.getCommentsUseCase.execute(postId)
            return { total_comments: comments.length, comments }
        } catch (e: any) {
            throw new NotFoundException(e.message)
        }
    }
}
