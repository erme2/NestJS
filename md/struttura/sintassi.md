# Costrutti di sintassi cui prestare attenzione

## Decorators
I decorators sono funzioni che si possono importare in altri oggetti


### @Controller()
Accetta un parametro string che rappresenta l'url di cui si occuperà
```typescript
// controllerà http://localhost:3000/app/*
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}
}
// controllerà http://localhost:3000/test/*
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}
```

### @Method() (get/post/delete/put/all ...)

Accetta un parametro stringa e all'interno di un controller si occuperà di tutte le richieste per il metodo specificato e l'url specificata
```typescript
// controllerà http://localhost:3000/app/*
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

// controllerà tutte le richieste GET a http://localhost:3000/app/*
  @Get()
  getHello(): string {
    return this.appService.getFunction();
  }

// controllerà tutte le richieste GET a http://localhost:3000/app/hello/*
  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
```

### @Param()
Usato all'intenno di un @Method ci permette di estrarre un param dalla request.
Possiamo dare al parametro estratto un nome di variabile e un tipo*:
```typescript
@Controller('users')
export class UsersController {
    @Get(":id")
    getUserById(@Param('id') idVar: string ): any {
        return {id: idVar}
    }
}
```
Attenzione anche se si specifica un tipo qui, bisognerà sempre controllare e trasformare questa variabile in un `number` ad esempio, perché una volta compilato questo JS trattera questa variabile sempre come una variabile JS (stringa in questo caso).

### @Body()
Body rappresenta il body della request, e può essere usato per trasferire il contenuto del body in una variabile.
```typescript
@Controller('users')
  @Post()
  newUser(@Body() requestBody: any): any {
    return this.userService.createUser(requestBody);
  }
}
```

### @Query()
Questo decorator serve a leggere i parametri espressi all'interno dell'url.
Ad esempio chiamando questo endpoint: `/users?name=bob`.
Più o meno funziona come il decorator [param](sintassi.md#param):
```typescript
// nel controller
  @ApiOkResponse({ type: User, isArray: true })
  @Get()
  // tutti gli utenti
  getUsers(@Query('name') queryName: string): User[] {
    return this.userService.findAll(queryName);
  }
  
  // nel service
  findAll(queryName?: string): User[] {
    if (queryName) {
      console.log(queryName);
    }
    return this.users;
  }  
```



