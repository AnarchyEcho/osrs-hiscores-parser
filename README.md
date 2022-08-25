# osrs-hiscores-parser

The purpose of this package is to parse and transform Old School Runescape Hiscore API results and return it as a JSON object.

Written entirely in TypeScript, it contains it's own type declarations.

## Usage

```typescript
  import { parser } from 'osrs-hiscores-parser';

  const json = await parser('username');
```
