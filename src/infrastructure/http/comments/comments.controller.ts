import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    BadRequestException,
    NotFoundException,
} from "@nestjs/common"
import { CreateCommentUseCase } from "@/application/use-cases/comments/create-comment.use-case"
import { GetCommentsUseCase } from "@/application/use-cases/comments/get-comments.use-case"
import { CreateCommentRequestDto } from "./comments.dtos"
import { PostNotFoundException } from "@/domain/exceptions/post-not-found.exception"
import { ModerationBlockedException } from "@/domain/exceptions/moderation-blocked.exception"

@Controller("api/posts/:id/comments")
export class CommentsController {
    constructor(
        private readonly createCommentUseCase: CreateCommentUseCase,
        private readonly getCommentsUseCase: GetCommentsUseCase,
    ) {}

    @Post()
    async create(
        @Param("id") postId: string,
        @Body() body: CreateCommentRequestDto,
    ) {
        try {
            const comment = await this.createCommentUseCase.execute(
                postId,
                body,
            )
            return { data: comment }
        } catch (e: unknown) {
            if (e instanceof PostNotFoundException) {
                throw new NotFoundException(e.message)
            }
            if (e instanceof ModerationBlockedException) {
                throw new BadRequestException(e.message)
            }
            throw e
        }
    }

    @Get()
    async list(@Param("id") postId: string) {
        try {
            const comments = await this.getCommentsUseCase.execute(postId)
            return { data: comments, total: comments.length }
        } catch (e: unknown) {
            if (e instanceof PostNotFoundException) {
                throw new NotFoundException(e.message)
            }
            throw e
        }
    }
}
