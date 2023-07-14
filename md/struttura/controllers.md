# Controllers

I controller sono i componenti che gestiscono le richieste HTTP. Ogni controller é 
collegato ad un modulo e ogni modulo puó avere piú controller. I controller sono
decorati con il decorator `@Controller()` che prende come parametro il path che 
deve gestire. 

Per esempio il controller che gestisce le richieste HTTP per il root `events`, collegato 
al modulo events avrá il path `/events` e sará decorato come segue:

```typescript
@Controller('/events')
export class EventsController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  getEvents(): string[] {
    return this.appService.getEvents();
  }
}
```
Il decorator `@Controller` accetta una semplice stringa come parametro, ma puó anche 
accettare un oggetto di configurazione con le seguenti proprietá:
```typescript
{
  path: string; // il path che deve gestire
  host?: string; // il dominio che deve gestire
  scope?: Scope[]; // la lista dei moduli che deve gestire
}
```

## Http Methods
Il decorator `@Get` (e tutti gli altri decorator che rappresentano un metodo HTTP), 
anch'essi accetta una semplice stringa come parametro, ma puó anche accettare un oggetto
di configurazione con le seguenti proprietá:
```typescript
{
  path: string; // il path che deve gestire
  host?: string; // il dominio che deve gestire
  scope?: Scope[]; // la lista dei moduli che deve gestire
}
```
Il path del decorator `@Get` é relativo al path del decorator `@Controller`, quindi 
se avessimo `events` come path del controller e `all` come path del metodo, il path
completo sarebbe `/events/all`.

## Params
Per definire i parametri all'interno di una route nella definizione del path, si
usa il carattere `:` seguito dal nome del parametro. Per esempio, se volessimo 
aggiungere un parametro `id` alla route `/events`, il path completo sarebbe
`/events/:id`.
Si possono definire anche all'interno del decorator del verbos HTTP, ma in questo
caso il path é relativo al path del decorator `@Controller`. Per esempio, se volessimo
aggiungere un parametro `id` alla route `/events`, il path completo sarebbe
`:id`.

```typescript
@Get(':id')
findOne(@Param('id') id: string) {
  return `This action returns a #${id} value`;
}
```
I parametri di un metodo HTTP sono definiti con il decorator `@Param` e accettano

## Request Body
Per definire il body di una richiesta HTTP si usa il decorator `@Body`. Il body
puó essere di tipo `string`, `number`, `boolean`, `object` o `array`. Per esempio,
se volessimo definire un body di tipo `string`:

```typescript
@Post()
create(@Body() input: object) {
  console.log(input);
  return input;
}
```

## Response
Qualsiasi cosa sia ritornata da un metodo HTTP, verrá automaticamente convertita in 
una risposta HTTP. Per esempio, se ritorniamo un oggetto on array, verrá automaticamente 
convertito in un JSON. Se ritorniamo una stringa, verrá automaticamente convertita

```typescript
@Post()
create(@Body() input: object) {
  console.log(input);
  return input;
}
/*
Response
{
  "name": "John",
  "age": 25,
  "isStudent": true
}
*/

@Get(':id')
findOne(@Param('id') id: string) {
  return `This action returns a #${id} value`;
}
/*
Response
This action returns a #1 value
*/
```
By default the status code of the response is 200, but it can be changed by using
the decorator `@HttpCode`:

```typescript
@Post()
@HttpCode(404)
create(@Body() input: object) {
  console.log(input);
  return input;
}
```


