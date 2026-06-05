import { Injectable } from "@nestjs/common"
import { CategoryRepository } from "@/domain/repositories/category.repository"
import { Category } from "@/domain/entities/category.entity"
import { PrismaService } from "@/infrastructure/persistence/prisma.service"

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
    constructor(private readonly prisma: PrismaService) {}
    async findAll(): Promise<Category[]> {
        const rows = await this.prisma.category.findMany({
            orderBy: { name: "asc" },
        })
        return rows.map(
            (row) =>
                new Category({ id: row.id, name: row.name, slug: row.slug }),
        )
    }
}
