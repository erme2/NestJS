# Testing 

I test automatizzati sono una parte essenziale di qualsiasi software serio.
Anche NestJS é stato costruito per facilitare al creazione di testi 
automatizzati.

Ci sono diverse metodologie e tipologie di test, e può essere utilizzato 
qualsiasi framework, Jest é quello fornito di default. 
Inoltre NestJS ci mette a disposizione per automatizzare e facilitare la 
creazione di test.

```shell
$ npm i --save-dev @nestjs/testing
```

Come abbiamo visto precedentemente, per ogni file `.ts` creato possiamo create
un file `.spec` che conterrà i test collegati allo specifico file.
Ad esempio per il file `app.controller.ts` ci sarà un file 
`app.controller.spec.ts` che conterrà i test per gli oggetti e le funzioni 
contenute in quello specifico file.
Come ad esempio questo file generato in automatico da NestJS:
```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

```
Per eseguire i test basta eseguire il comando 
```shell
$ npm run test

> test_app@0.0.1 test
> jest

 PASS  src/users/users.service.spec.ts
 PASS  src/app.controller.spec.ts
 FAIL  src/users/users.controller.spec.ts
  ● Test suite failed to run

    src/users/dto/create-user.dto.ts:2:32 - error TS2307: Cannot find module 'class-validator' or its corresponding type declarations.

    2 import { IsAlphanumeric } from 'class-validator';
                                     ~~~~~~~~~~~~~~~~~

Test Suites: 1 failed, 2 passed, 3 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.691 s
Ran all test suites.
npm notice 
npm notice New minor version of npm available! 9.6.4 -> 9.7.1
npm notice Changelog: https://github.com/npm/cli/releases/tag/v9.7.1
npm notice Run npm install -g npm@9.7.1 to update!
npm notice 

```
Come potete vedere sono riuscito a superare solo 2 dei 3 test totali.

Per poter correggere il codice e passare tutti i test si puó usare la 
modalità `watch`

```shell
$ npm run test:watch

> test_app@0.0.1 test:watch
> jest --watch
No tests found related to files changed since last commit.
Press `a` to run all tests, or run Jest with `--watchAll`.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```
Questa modalità ci offre diverse comode opzioni per lavorare meglio 
alla risuluzione dei problemi. Usale :)