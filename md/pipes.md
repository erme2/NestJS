# [Pipes](https://docs.nestjs.com/pipes)
I pipes sono strumenti utilizzati per due scopi: 
- validare
- trasformare

In entrambi i casi, i pipes vengono utilizzati sugli arguments passati ad un `controller route handler`.
Come abbiamo visto in precedenza il routing é gestito dai decorators [@Controller](./struttura/sintassi.md#controller) e [@Method](./struttura/sintassi.md#method-getpostdeleteputall).

## Uso basilare:

In questo caso, nonostante `idVar` sia dichiarato come number, se dovessimo passare una stringa non ci sarebbe nessun controllo o transformazione.

```typescript
  @Get(':id')
  getUserById(@Param('id') idVar: number): User {
    const response = this.userService.findById(idVar);
    if (response) {
      return response;
    }
    throw new NotFoundException();
  }
```
Se cercassimo `/users/3333333333` avremo un semplice 404, come giusto che sia: `3333333333` é non corrisponde a nessun utente ma é un numero valido.
Se invece cercassimo `/users/aaa`, e ricevessimo un 404 come se fosse un numbero, non sarebbe corretto.
```json
{
    "statusCode": 404,
    "message": "Not Found"
}

Però se aggingessimo un pipe come secondo parametro al decorator [@Param](./struttura/sintassi.md#param)
```typescript
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) idVar: number): User {
    const response = this.userService.findById(idVar);
    if (response) {
      return response;
    }
    throw new NotFoundException();
  }
```
l'errore per `/users/aaa` sarà:
```json
{
    "statusCode": 400,
    "message": "Validation failed (numeric string is expected)",
    "error": "Bad Request"
}
```

## Uso globale
Per avere una serie di decorators che potremo usare principalmente nelle strutture dati (come [entities](./../README.md#entities) o [DTO](./../README.md#dto-data-transfer-object)) potremmo volerli dichiarare come globals.

Per prima cosa dovremo installare via npm i pacchetti [`class-validator`](https://github.com/typestack/class-validator) e [`class-transformer`](https://github.com/typestack/class-transformer.git).

```bash
npm install class-validator class-transformer
```

Per inglobarli dopo aver installato i pacchetti dovremo aprire il file [main.ts](./../src/main.ts) e aggiungere una riga:
```typescript
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // questa riga :)
    app.useGlobalPipes(new ValidationPipe());
```

Troverete l'elenco di tutti i decorators e le istruzioni per utilizzarli al meglio nella documentazione dei pacchetti stessi.

Altro esempio di DTO
```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ minLength: 5, maxLength: 10 })
    @IsAlphanumeric()
    @MinLength(5)
    @MaxLength(10)
    name: string;
}
```