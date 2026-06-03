@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
    constructor(private readonly prisma: PrismaService) {}
    async findAll(): Promise<Category[]> {
        const rows = await this.prisma.category.findMany({ orderBy: { name: "asc" } })
        return rows.map(row => new Category({ id: row.id, name: row.name, slug: row.slug }))
    }
}