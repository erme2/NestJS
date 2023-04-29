# Testing
GLi unit test in NestJS sono scritti in Jest. Ogni controller e service hanno un file 
con lo stesso nome + spec + ts
Ad esempio il controller `users.controller.ts` avrà un file con gli unit tests dentro 
che si chiamerà `users.controller.spec.ts`.

## Eseguire i test
Per eseguire i test basterà eseguire il comando
```shell
npm run test
```
### Modalità watch
Per facilitare lo sviluppo dei test é stata creata la modalita `watch`.
```shell
npm run test:watch
[...]
Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.


```


