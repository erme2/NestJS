# Controllers

I controller sono i componenti che gestiscono le richieste HTTP. Ogni controller é 
collegato ad un modulo e ogni modulo puó avere piú controller. I controller sono
decorati con il decorator `@Controller()` che prende come parametro il path che 
deve gestire. 

Per esempio il controller che gestisce le richieste HTTP per il root `events`, collegato 
al modulo events avrá il path `/events` e sará decorato come segue:

```typescript
@Controller()
export class EventsController {
  constructor(private readonly eventService: EventService) {}

  // il decorator @Get (e anche tutti gli altri che rappresentano i metodi http)
  // accetta una semplice stringa che reprresents il  path che deve gestire
  @Get('/events')
  getEvents(): string[] {
    return this.appService.getEvents();
  }
  // oppure accetta anche un oggetto che contenga la proprietá path al suo interno
  @Get({
    path: '/events',
  })
  getEvents(): string[] {
    return this.appService.getEvents();
  }
}
