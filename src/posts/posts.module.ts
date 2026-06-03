import { Module } from "@nestjs/common"
import { PostsController } from "./posts.controller"
import { CreatePostUseCase } from "@/application/use-cases/posts/create-post.use-case"
import { GetFeedUseCase } from "@/application/use-cases/posts/get-feed.use-case"
import { GetPostsUseCase } from "@/application/use-cases/posts/get-posts.use-case"
import { ModerationDomainService } from "@/domain/services/moderation.service"
import { FeedRankingStrategyFactory } from "@/domain/services/feed-ranking.strategy"

@Module({
    controllers: [PostsController],
    providers: [CreatePostUseCase, GetFeedUseCase, GetPostsUseCase, ModerationDomainService, FeedRankingStrategyFactory],
})
export class PostsModule {}
