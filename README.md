# osrs-hiscores-parser

The purpose of this package is to parse and transform Old School Runescape Hiscore API results and return it as a JSON object.

Written entirely in TypeScript, it contains it's own type declarations.

## Installation

### yarn

```shell
yarn add osrs-hiscores-parser@1.1.0
```
### npm

```shell
npm install osrs-hiscores-parser@1.1.0
```

## Usage

```typescript
  import { parser } from 'osrs-hiscores-parser';

  const json = await parser('username');
```
