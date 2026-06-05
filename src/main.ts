import { join } from "node:path"
import { AppModule } from "@/app.module"

import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { NestExpressApplication } from "@nestjs/platform-express"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { ConfigService } from "@nestjs/config"

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)

    const configService = app.get(ConfigService)
    const port = configService.get<number>("PORT", 3000)
    const host = configService.get<string>("HOST", "0.0.0.0")

    app.enableCors({
        origin: "*",
    })

    app.useStaticAssets(join(process.cwd(), "public"))
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    )

    const config = new DocumentBuilder()
        .setTitle("NestJS AC_06 - Clean Architecture")
        .setDescription(
            "API documentation for the NestJS AC_06 - Clean Architecture project",
        )
        .setVersion("1.0")
        .build()

    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup("docs", app, document)

    await app.listen(port, host)

    console.log(`Application running on: http://${host}:${port}`)
    console.log(`Documentation at: http://${host}:${port}/docs`)
}

bootstrap()
