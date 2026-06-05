import { PrismaLibSql } from "@prisma/adapter-libsql"
import { PrismaClient } from "@prisma/client"

import { Injectable, OnModuleInit } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor(config: ConfigService) {
        const databaseUrl = config.get<string>("DB_URL") ?? "file:./sqlite.db"
        const adapter = new PrismaLibSql({ url: databaseUrl })

        super({ adapter })
    }

    async onModuleInit() {
        await this.$connect()
    }
}
