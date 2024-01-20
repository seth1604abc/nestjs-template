import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle('Nestjs Template')
        .setDescription('The api description')
        .addBearerAuth(undefined, 'Bearer')
        .setVersion('1.0')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('swagger', app, document)

    app.listen(3000).then(() => {
        console.log('===============================================')
        console.log('Server running')
    })
}
bootstrap()
