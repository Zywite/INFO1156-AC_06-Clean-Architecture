import { Body, Controller, Get, Param, Post } from "@nestjs/common"
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
        return this.createCommentUseCase.execute(postId, body)
    }

    @Get()
    async list(@Param("id") postId: string) {
        const comments = await this.getCommentsUseCase.execute(postId)
        return { total_comments: comments.length, comments }
    }
}
