# [Swagger](https://swagger.io/)
Swagger é un editor che ci permette di creare la documentazione di un progetto rest api. Si compone di una parte statica (html+css+js) e di un file strutturare `json` o `yaml`.
Queste due parti insieme ci consentono di creare una pagina html che descrive il progetto rest api che stiamo creando.

Nella fattispecie esiste una libreria specifica per generare un sito swagger da un nostro progetto NestJS.

La documentazione completa su come usare questi decorators la trovi [qui](https://docs.nestjs.com/openapi/operations).

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
@ApiTags('Users')
```
E il sito swagger verrà ricompilato usando le sezioni indicate con questo decorator.

## Properties

Poiché il controller Users usa un DTO per controllare che il body sia corretto, possiamo usare un altro decorator per aggiungere qualche informazione alla documentazione generata da swagger

```typescript
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty()
  name: string;
  @ApiProperty({ required: false, default: 10 })
  age?: number;
}
```
Possiamo passare al decorator anche altre proprietà per ogni campo.

## Query
Abbiamo appena aggiunto un parametro opzionale ad un endpoint:
```typescript
  @ApiOkResponse({ type: User, isArray: true })
  @Get()
  // tutti gli utenti
  getUsers(@Query('name') queryName: string): User[] {
    return this.userService.findAll(queryName);
  }
```
In swagger verrà evidenziato come required di default. Per ovviare a questo problema possiamo usare il decorator `@ApiQuery`:
```typescript
  @ApiOkResponse({ type: User, isArray: true })
  @Apu
  @Get()
  // tutti gli utenti
  getUsers(@Query('name') queryName: string): User[] {
    return this.userService.findAll(queryName);
  }
```
## Responses
Ci sono decine di tipi di risposte documentate, trovi l'elenco completo [qui](https://docs.nestjs.com/openapi/operations#responses). Queste sotto sono le principali.

### 200 - Ok
Per il 90% degli ] altri endpoint possiamo usare `@ApiOkResponse`
```typescript
  @ApiOkResponse({ type: User, isArray: true })
  @Get()
  // tutti gli utenti
  getUsers(): User[] {
    return this.userService.findAll();
  }

  // utente: id
  @ApiOkResponse({ type: User })
  @Get(':id')
  getUserById(@Param('id') idVar: number): User {
    return this.userService.findById(idVar);
  }
```


### 201 - Created
É a nostra disposizione anche un altro decorator `@ApiCreatedResponse`.

```typescript
  @ApiCreatedResponse({ type: User })
  @Post()
  newUser(@Body() requestBody: CreateUserDto): User {
    return this.userService.createUser(requestBody.name);
  }
```
Perché funzioni correttamente dovremo anche aggiungere i decorator `@ApiProperty` alla entity connessa.

```typescript
import { ApiProperty } from "@nestjs/swagger";

export class User {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}
```

### 404 - Not found
Nel caso in cui il nostro codice prevede di restituire una NotFoundException in qualche specifico caso, basterà aggiungere il decorator `@ApiNotFoundResponse` perché questa possibilità venga documentata in swagger.

```typescript
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @Get(':id')
  getUserById(@Param('id') idVar: number): User {
    const response = this.userService.findById(idVar);
    if (response) {
      return response;
    }
    throw new NotFoundException();
  }
```