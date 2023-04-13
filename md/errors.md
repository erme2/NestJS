# Errors
Per come l'abbiamo sviluppata la nostra app restituisce sempre uno status = 200 (ok), anche se non abbiamo trovato un utente per uno specifico id e la risposta é vuota (null).
Come facciamo a restituire uno status 404 (not found) ad esempio?
Usando una new `NotFoundException`:

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

Ma la possibilità di restituire errori non é limitato a questo tipo di eccezione/errore.
É disponibile una lunga lista di alternative e il vostro editor dovrebbe essere in grado di suggerirvele.
In ogni caso ci sono molti tipi di eccezioni/errori [documentati](https://docs.nestjs.com/exception-filters#built-in-http-exceptions) sul sito della documentazione di [NestJS/Exception filters](https://docs.nestjs.com/exception-filters) e la possibilità di creare errori o eccezioni personalizzati.

Anche per quanto riguarda la libreria swagger, l'elenco dei tipi di risposta ed errori é lunghissimo e lo trovi [qui](https://docs.nestjs.com/openapi/operations#responses)
