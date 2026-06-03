import { NotFoundException } from "@nestjs/common"

@Injectable()
export class PrismaProhibitedWordRepository implements ProhibitedWordRepository {
    constructor(private readonly prisma: PrismaService) {}
    async findAll(): Promise<ProhibitedWord[]> {
        const rows = await this.prisma.prohibitedWord.findMany({ orderBy: { createdAt: "desc" } })
        return rows.map(row => new ProhibitedWord({ id: row.id, word: row.word, category: row.category, createdAt: row.createdAt }))
    }
    async save(pw: ProhibitedWord): Promise<ProhibitedWord> {
        const row = await this.prisma.prohibitedWord.create({ data: { word: pw.word, category: pw.category } })
        return new ProhibitedWord({ ...row })
    }
    async delete(id: string): Promise<void> {
        try { await this.prisma.prohibitedWord.delete({ where: { id } }) }
        catch (err: unknown) {
            if (err instanceof Error && "code" in err && (err as any).code === "P2025")
                throw new NotFoundException("Palabra prohibida no encontrada")
            throw err
        }
    }
}