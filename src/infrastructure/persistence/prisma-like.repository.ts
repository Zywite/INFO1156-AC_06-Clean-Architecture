@Injectable()
export class PrismaLikeRepository implements LikeRepository {
    constructor(private readonly prisma: PrismaService) {}
    async save(like: Like): Promise<Like> {
        const row = await this.prisma.like.create({ data: { postId: like.postId, reactionType: like.reactionType, weight: like.weight, source: "likes-module" } })
        return new Like({ ...row })
    }
}