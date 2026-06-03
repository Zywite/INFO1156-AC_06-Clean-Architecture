import { PostRepository, PostWithInteractions } from "@/domain/repositories/post.repository"
import { FeedRankingStrategyFactory, FeedMode } from "@/domain/services/feed-ranking.strategy"

export class GetFeedUseCase {
    constructor(
        private readonly postRepo: PostRepository,
        private readonly feedRankingFactory: FeedRankingStrategyFactory,
    ) {}

    async execute(categoryId?: string, mode: FeedMode = "latest"): Promise<PostWithInteractions[]> {
        const posts = await this.postRepo.findWithInteractions(categoryId)
        const strategy = this.feedRankingFactory.forMode(mode)
        return strategy.rank(posts)
    }
}
