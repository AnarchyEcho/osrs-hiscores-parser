# DISCONTINUED

# osrs-hiscores-parser

The purpose of this package is to parse and transform Old School Runescape Hiscore API results and return it as a JSON object.

Written entirely in TypeScript, it contains it's own type declarations.

## Installation

### yarn

```shell
yarn add osrs-hiscores-parser
```
### npm

```shell
npm install osrs-hiscores-parser
```

## Usage
\*Usernames can be any case, lower, UPPER or MiXeD.

### Base JS/TS
```typescript
import { parser } from 'osrs-hiscores-parser'

(async function example() {
  const json = await parser(['echogim', 'lynx titan']);
  console.log(...json)
})()
```

### React
```tsx
import { parser } from 'osrs-hiscores-parser'

const [json, setJson] = React.useState<any[]>();
useEffect(() => {
  (async () => {
    !json && setJson(await parser(['echogim', 'emerald12']))
  })()
  console.log(json)
}, [json])
```
