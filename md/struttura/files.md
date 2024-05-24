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

La funzione bootstrap é quella che definisce e avvia l'applicazione. 
In questo momento viene caricato solo il [modulo](../../README.md#modules) `AppModule` e gli altri moduli principali o di systema,
come un servizio di Log ad esempio.


[La struttura](./../struttura.md)

[Home](./../../README.md)
