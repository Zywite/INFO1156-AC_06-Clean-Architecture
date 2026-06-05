import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { PrismaModule } from "@/infrastructure/persistence/prisma.module"
import { PostsModule } from "@/infrastructure/http/posts/posts.module"
import { CommentsModule } from "@/infrastructure/http/comments/comments.module"
import { LikesModule } from "@/infrastructure/http/likes/likes.module"
import { CategoriesModule } from "@/infrastructure/http/categories/categories.module"
import { ModerationModule } from "@/infrastructure/http/moderation/moderation.module"

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,
        PostsModule,
        CommentsModule,
        LikesModule,
        CategoriesModule,
        ModerationModule,
    ],
})
export class AppModule {}
