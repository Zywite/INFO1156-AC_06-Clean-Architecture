import { Injectable } from "@nestjs/common"

export type FeedPost = {
    createdAt: Date
    likesCount: number
    commentsCount: number
    relevanceScore: number
}

export type FeedMode = "latest" | "mostLiked" | "mostCommented" | "relevance"

export interface FeedRankingStrategy {
    rank<T extends FeedPost>(posts: T[]): T[]
}

@Injectable()
export class LatestRankingStrategy implements FeedRankingStrategy {
    rank<T extends FeedPost>(posts: T[]): T[] {
        return [...posts].sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
        )
    }
}

@Injectable()
export class MostLikedRankingStrategy implements FeedRankingStrategy {
    rank<T extends FeedPost>(posts: T[]): T[] {
        return [...posts].sort((a, b) => b.likesCount - a.likesCount)
    }
}

@Injectable()
export class MostCommentedRankingStrategy implements FeedRankingStrategy {
    rank<T extends FeedPost>(posts: T[]): T[] {
        return [...posts].sort((a, b) => b.commentsCount - a.commentsCount)
    }
}

@Injectable()
export class RelevanceRankingStrategy implements FeedRankingStrategy {
    rank<T extends FeedPost>(posts: T[]): T[] {
        return [...posts].sort((a, b) => b.relevanceScore - a.relevanceScore)
    }
}

@Injectable()
export class FeedRankingStrategyFactory {
    private readonly strategies: Map<FeedMode, FeedRankingStrategy>

    constructor(
        latest: LatestRankingStrategy,
        mostLiked: MostLikedRankingStrategy,
        mostCommented: MostCommentedRankingStrategy,
        relevance: RelevanceRankingStrategy,
    ) {
        this.strategies = new Map<FeedMode, FeedRankingStrategy>([
            ["latest", latest],
            ["mostLiked", mostLiked],
            ["mostCommented", mostCommented],
            ["relevance", relevance],
        ])
    }

    forMode(mode: string): FeedRankingStrategy {
        return (
            this.strategies.get(mode as FeedMode) ??
            this.strategies.get("latest")!
        )
    }
}
