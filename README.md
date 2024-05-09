# NestJS
Appunti su NestJS

## Installazione
NestJS comprende una cli (command line interface) facilmente installabile usando `npm`

```bash
$ npm i -g @nestjs/cli
```

## Nuovo progetto
Semplice :) usanddo la cli appena installata:
```bash
$ nest new test_app
Which package manager would you ❤️  to use? (Use arrow keys)
❯ npm 
  yarn 
  pnpm 
```
Io ho selezionato npm ma non dovrebbe essere importante

## Modules
I moduli servono a raccogliere delle entità di dominio. Se volessi aggiungere la gestione degli utenti, sarebbe comodo un modulo utenti, nel quale raccogliere tutti gli oggetti (controller, service ...).

Ogni modulo può contenere molteplici controllers, services e ogni sorta di oggetto al suo interno.

Per fare questo possiamo usare il [CLI](./md/cli.md)

```bash
# generiamo un modulo users
$ nest generate module users
CREATE src/users/users.module.ts (82 bytes)
UPDATE src/app.module.ts (312 bytes)

# generiamo un controller users
$ nest generate controller users  
CREATE src/users/users.controller.spec.ts (485 bytes)
CREATE src/users/users.controller.ts (99 bytes)
UPDATE src/users/users.module.ts (170 bytes)

# generiamo un service users
$ nest generate service users
CREATE src/users/users.service.spec.ts (453 bytes)
CREATE src/users/users.service.ts (89 bytes)
UPDATE src/users/users.module.ts (247 bytes)
```
Se analizzate la struttura noterete che:

1. tutti files si trovano in una sottocartella all'interno di `src` chiamata `users` (come il modulo)
1. sono stati creati files `.spect.ts` per il controller e il service. Questi files verrano usati negli unit tests.
1. il file [app.module.ts](./src/app.module.ts) é stato aggiornato per importare il nuovo [modulo - users.module.ts](./src/users/users.module.ts) che é stato creato nella nuova cartella [`users`](./src/users/)
1. quando sono stati creati il controller e il service con lo stesso nomedel modulo, tutti i files sono stati creati nella stessa cartella del modulo e il modulo [users](./src/users/users.module.ts) é stato aggiornato per includere i nuovi files.


Ora guardiamo nel dettaglio il codice: abbiamo aggiunto un modulo, che é una specie di contenitore per alcuni oggetti, in particolare controllers e services. Abbiamo poi creato un controller e un service, e avendo creato il tutto usando la cli sono tutti collegati tra loro.
Il modulo viene importato automaticamente dalla app generale, e a sua volta carica automaticamente il controller e il service.

## Controllers
I controllers sono generalmente utilizzati per gestire l'oggetto request, richiamare i services che invece contengono la logica, generare e restituire una response.

Diciamo che vogliamo ora iniziare a gestire gli endpoint per questo modulo.
Aprendo il controller che abbiamo creato noteremo subito che di default é puntato su tutti gli endpoint `/users/*` (NestJS fa un uso estremo dei `decorators`)

```typescript
@Controller('users')
export class UsersController {}
```
A questo punto tutte le request per tutti gli endpoint che iniziano per `/users` saranno gestite da questo controller.
Se non aggiungiamo nessuna logica in controller restituirà sempre per ogni request un a response con errore `404` pagina o risorsa non trovata.

Per generare una risposta specifica per uno specifico metodo e enpoind userremo un altro tipo di decorator. 

Ogni http method ha un apposito decorator, e in più c'é `@All` che li contiene tutti.

Questi [`@method`](./md/struttura/sintassi.md#method-getpostdeleteputall) decorators accettano a loro volta una stringa come parametro e questo può definire sia sotto insiemi di enpoints, sia viariabili come un ID.

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    // tutti gli utenti
    getUsers(): any { 
        // la response sarà di default un file json
        return [{id: 0}];
    }
    // utente: id
    @Get(":id")
    getUserById(@Param('id') idVar: number ): any {
        // la response sarà di default un file json
        return {id: idVar, cast: Number(idVar)}
    }
}
```
## Services
Come abbiamo già scritto, la logica dell'applicazione dovrebbe essere demandata ad un service, che potrebbe aprire la connessione ad un DB e generare i dati da restituire.
Per connettere un servizio ad un controller basta usare un constructor.
```typescript
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    ...
```
Questa riga di codice basta a NestJS per rendere disponibile all'uso l'[UsersService](./src/users/users.service.ts) e tutte le sue funzioni all'interno del controller.

Se ora definissimo un finto DB potremmo creare due funzioni da usare nel controller

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: any = [
    { id: 1, name: 'erme2' },
    { id: 2, name: 'test123' },
  ];

  findAll() {
    return this.users;
  }

  findById(userId: number) {
    for (const k in this.users) {
      if (this.users[k].id == userId) {
        return this.users[k];
      }
    }
    return null;
  }
}
```
A questo punto basterebbe aggiornare il controller per usare queste due nuove funzioni ed il gioco é fatto :)

```typescript
  @Get()
  // tutti gli utenti
  getUsers(): any {
    return this.userService.findAll();
  }

  // utente: id
  @Get(':id')
  getUserById(@Param('id') idVar: number): any {
    return this.userService.findById(idVar);
  }
```

## DTO (data transfer object)
I dto sono delle classi che rappresentano degli oggetti contenenti dei dati. Per descriverli meglio faremo un esempio.
Diciamo che vogliamo creare un utente, potremmo aggiungere un nuovo endpoint al nostro controller: 
```typescript
  // users.controller.ts
  @Post()
  newUser(@Body() requestBody: any): any {
    return this.userService.createUser(requestBody);
  }
  // users.service.ts
  createUser(requestBody: any) {
    const newUser = {
      id: this.users.length + 1,
      name: requestBody.name,
    };
    return newUser;
  }
```
Per leggere i dati dalla request, questa volta useremo un altro decorator [@Body], ma eliminare le variabili di tipo `any` é il motivo per cui utilizziamo delle TS.
Per questo creeremo un dto che ci permetterà di eliminare le variabili di tipo `any` sia dal controller che dal service.

All'interno della cartella `users` creeremo una nuova cartella `dto` e all'interno un nuovo file e lo chiameremo `create-user.dto.ts`
```typescript
export class CreateUserDto {
  name: string;
}
```
A questo punto sarà disponibile un nuovo  di variablie che ci permetterà di aggiornare sia il controller che il service:
```typescript
  // users.controller.ts
  import { CreateUserDto } from './dto/create-user.dto';
[...]
  @Post()
  newUser(@Body() requestBody: CreateUserDto): any {
    return this.userService.createUser(requestBody.name);
  }
  // users.service.ts
  createUser(name: string) {
    const newUser = {
      id: this.users.length + 1,
      name: name,
    };
    return newUser;
  }
```

### Entities
Le entities sono delle classi che rappresentano i dati che abbiamo nel database. Anche in questo case le useremo per definire meglio le funzioni che abbiamo appena creato. DTO vengono usati per i dati in entrata, Entities sono usate per le connessioni con il DB.
Sempre nella cartella `users` creeremo una una nuova cartella `entities` e il file `user.entity.ts`:
```typescript
export class User {
  id: number;
  name: string;
}
```
Una volta definito questo tipo di entity possiamo importarla all'interno del controller e del service e ggiornarli:

Controller senza Entity:
```typescript
  @Get()
  // tutti gli utenti
  getUsers(): any {
    return this.userService.findAll();
  }

  // utente: id
  @Get(':id')
  getUserById(@Param('id') idVar: number): any {
    return this.userService.findById(idVar);
  }

  @Post()
  newUser(@Body() requestBody: CreateUserDto): any {
    return this.userService.createUser(requestBody.name);
  }
```
Controller aggiornato:
```typescript
import { User } from './entities/user.entity';
[...]
  @Get()
  // tutti gli utenti
  getUsers(): User[] {
    return this.userService.findAll();
  }

  // utente: id
  @Get(':id')
  getUserById(@Param('id') idVar: number): User {
    return this.userService.findById(idVar);
  }

  @Post()
  newUser(@Body() requestBody: CreateUserDto): User {
    return this.userService.createUser(requestBody.name);
  }
```
Service senza Entity:
```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: any = [
    { id: 1, name: 'erme2' },
    { id: 2, name: 'test123' },
  ];

  findAll() {
    return this.users;
  }

  findById(userId: number) {
    for (const k in this.users) {
      if (this.users[k].id == userId) {
        return this.users[k];
      }
    }
    return null;
  }

  createUser(name: string) {
    // this will not stay anywhere :)
    const newUser = {
      id: this.users.length + 1,
      name: name,
    };
    return newUser;
  }
}
```

Service Aggiornato:
```typescript
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'erme2' },
    { id: 2, name: 'test123' },
  ];

  findAll(): User[] {
    return this.users;
  }

  findById(userId: number): User {
    for (const k in this.users) {
      if (this.users[k].id == userId) {
        return this.users[k];
      }
    }
    return null;
  }

  createUser(name: string): User {
    // this will not stay anywhere :)
    const newUser = {
      id: this.users.length + 1,
      name: name,
    };
    return newUser;
  }
}

```



## REFS
- ### [CLI (command line interface)](./md/cli.md)
- ### [Errors](./md/errors.md)
- ### [Struttura](./md/struttura.md)
- ### [Swagger](./md/swagger.md)
- ### [Testing](./md/testing.md)
 

