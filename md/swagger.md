# [Swagger](https://swagger.io/)
Swagger é un editor che ci permette di creare la documentazione di un progetto rest api. Si compone di una parte statica (html+css+js) e di un file strutturare `json` o `yaml`.
Queste due parti insieme ci consentono di creare una pagina html che descrive il progetto rest api che stiamo creando.

Nella fattispecie esiste una libreria specifica per generare un sito swagger da un nostro progetto NestJS.

## Installazione
Per prima cosa installiamo il pacchetto usando `npm`
```bash
npm install --save @nestjs/swagger swagger-ui-express
```
Poi apriamo il file [main.ts](./../src/main.ts) e aggiungiamo questo codice:
```typescript

  const app = await NestFactory.create(AppModule);

  // inizio aggiunta modulo swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Test RestAPI')
    .setDescription('Just a description for a test RestAPI')
    .setVersion('0.1')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/', app, swaggerDocument);
  // fine aggiunta modulo swagger

  await app.listen(3000);
```
La la libreria che abbiamo installato creerà in automatico un sito swagger con tutti gli endpoint che abbiamo definito nella nostra applicazione.

Poiché non ho nessun controller sulla main root (/), ho configurato swagger per funzionare in quella posizione, ma volendo spostarlo basterebbe aggiorare il primo parametro della funzione `setup` e il gioco é fatto:
```typescript
  SwaggerModule.setup('/swagger', app, swaggerDocument);
```

## Sezioni
Per una migliore comprensione della documentazione potremmo voler migliorare la documentazione. Potremmo voler aggiungere delle sezioni ad esempio e per farlo basta aprire uno dei controller interessati ed aggiungere un decorator:
```typescript

```