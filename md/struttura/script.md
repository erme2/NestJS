# Gli script
Se guardiamo il file `package.json` troveremo tutti gli script elencati nella sezione `script`.

## start:dev
Per avviare il server di sviluppo basterà chiamare il comando
```bash
npm run start:dev
```
Node inizierà a compilare e avvierà un server sulla porta `3000` per [`localhost`](http://localhost:3000), per cambiare la porta controllote il file [src/main.ts](./../test_app/src/main.ts).
```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
```

[La struttura](./../struttura.md)

[Home](./../../README.md)
