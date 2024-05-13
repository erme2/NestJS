import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Test RestAPI')
        .setDescription('Just a description for a test RestAPI')
        .setVersion('0.1')
        .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/swagger', app, swaggerDocument);

    await app.listen(3000);
}
bootstrap();
