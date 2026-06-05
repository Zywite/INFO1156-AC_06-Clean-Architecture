import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    BadRequestException,
} from "@nestjs/common"
import { CreatePostUseCase } from "@/application/use-cases/posts/create-post.use-case"
import { GetFeedUseCase } from "@/application/use-cases/posts/get-feed.use-case"
import { GetPostsUseCase } from "@/application/use-cases/posts/get-posts.use-case"
import { CreatePostRequestDto, FeedQueryRequestDto } from "./posts.dtos"
import { ModerationBlockedException } from "@/domain/exceptions/moderation-blocked.exception"

@Controller("api/posts")
export class PostsController {
    constructor(
        private readonly createPostUseCase: CreatePostUseCase,
        private readonly getFeedUseCase: GetFeedUseCase,
        private readonly getPostsUseCase: GetPostsUseCase,
    ) {}

    @Post()
    async create(@Body() body: CreatePostRequestDto) {
        try {
            const post = await this.createPostUseCase.execute(body)
            return { data: post }
        } catch (e: unknown) {
            if (e instanceof ModerationBlockedException) {
                throw new BadRequestException(e.message)
            }
            throw e
        }
    }

    @Get()
    async findAll() {
        const posts = await this.getPostsUseCase.execute()
        return { data: posts, total: posts.length }
    }

    @Get("feed")
    async getFeed(@Query() query: FeedQueryRequestDto) {
        const mode = query.mode ?? "latest"
        const posts = await this.getFeedUseCase.execute(query.categoryId, mode)
        return { data: posts, total: posts.length, mode }
    }
}
