import { Module } from "@nestjs/common"
import { PostsController } from "./posts.controller"
import { CreatePostUseCase } from "@/application/use-cases/posts/create-post.use-case"
import { GetFeedUseCase } from "@/application/use-cases/posts/get-feed.use-case"
import { GetPostsUseCase } from "@/application/use-cases/posts/get-posts.use-case"
import { ModerationGuard } from "@/application/services/moderation-guard.service"
import {
    FeedRankingStrategyFactory,
    LatestRankingStrategy,
    MostLikedRankingStrategy,
    MostCommentedRankingStrategy,
    RelevanceRankingStrategy,
} from "@/domain/services/feed-ranking.strategy"

@Module({
    controllers: [PostsController],
    providers: [
        CreatePostUseCase,
        GetFeedUseCase,
        GetPostsUseCase,
        ModerationGuard,
        FeedRankingStrategyFactory,
        LatestRankingStrategy,
        MostLikedRankingStrategy,
        MostCommentedRankingStrategy,
        RelevanceRankingStrategy,
    ],
})
export class PostsModule {}
