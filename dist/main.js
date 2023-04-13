"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Test RestAPI')
        .setDescription('Just a description for a test RestAPI')
        .setVersion('0.1')
        .build();
    const swaggerDocument = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('/swagger', app, swaggerDocument);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map