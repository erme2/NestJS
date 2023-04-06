# Files

## [./src/main.ts](./../../test_app/src/main.ts)
É il file principale, da qui parte tutto

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```



[La struttura](./../struttura.md)

[Home](./../../README.md)
