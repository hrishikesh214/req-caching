# Req Caching

### Easily cache all types of request

```css
note: This package is under Development;
```

## Getting Started

`npm i req-caching`

Now in index.js, initialize class

```js
import Caching from "req-caching"

const Store = new Caching("localstorage")
```

## Adding a element to store

Before you add element, lets look at some keywords

> 1. **Key** - A string considering as a name to cache element. Can be treated as key to Associative Array.
> 2. **Seed** - A function which must **return** some value, which will be treated as value of element. This function will be called whenever element value is needed.
> 3. **MaxAge** - Maximum age for caching. Once the time expires, **Seed** Function will be called and a new cache value is stored with new Age.

Now you will have to register a new element

```js
const seed = async () => {
    // any steps
    // just fetch value as you need
    // and return them
    return value
}
// add method registers an element and it can be used afterwards
await Store.add('unique-key', seed [, Extra Opts])
```

## Extra Options

```ts
interface OPTS{
    maxAge?:{
        seconds ?: number [default: 60]
        minutes ?: number [default: 0]
        hours ?: number [default: 0]
    },
    strict ?: boolean [default: false],
    encrypt ?: boolean [default: false],

}
```

## Getting values

Congratulations, now as when you have registered all your elements, you now just need to call Store. Store will manage all things.

```js
let my_var = await Store.get("my_var")
```

```css
Thank You
Made with Love by Hrishikesh
```
