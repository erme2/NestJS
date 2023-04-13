# CLI (command line interface)

## new
Semplice :) usanddo la cli appena installata:
```bash
$ nest new test_app
Which package manager would you ❤️  to use? (Use arrow keys)
❯ npm 
  yarn 
  pnpm 
```

## generate
La CLI può essere usata anche per generare oggetti che poi utilizzeremo, tipo controllers, moules o services

```bash
# per maggiori dettagli potete chiedere aiuto :)
$ nest generate --help
Generate a Nest element.
  Schematics available on @nestjs/schematics collection:
  ...

# per generare un modulo users
$ nest generate module users
CREATE src/users/users.module.ts (82 bytes)
UPDATE src/app.module.ts (312 bytes)

# ci sono anche delle shortcuts 
$ nest g co users 
CREATE src/users/users.controller.spec.ts (485 bytes)
CREATE src/users/users.controller.ts (99 bytes)
UPDATE src/users/users.module.ts (170 bytes)

$ nest g s users
CREATE src/users/users.service.spec.ts (453 bytes)
CREATE src/users/users.service.ts (89 bytes)
UPDATE src/users/users.module.ts (247 bytes)
```




