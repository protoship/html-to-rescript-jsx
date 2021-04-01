# HTML-to-ReScript-JSX

Convert plain HTML with inline styles into valid ReScript React JSX component.

Use online: [https://html-to-rescript-jsx.protoship.io/](https://html-to-rescript-jsx.protoship.io/)

## Development

1. Start ReScript compiler to compile `src/**/*.res` to `.bs.js`.

```
npm run start
```

2. Start Webpack dev server:

```
npm run dev
```

## Testing

The tests are run on the browser.

```
npm run test
```

This will start the Webpack dev server, which will build `browserTest.bs.js` and
opens `src/test.html` in browser.

## Thanks to

- https://github.com/littlehaker/html-to-jsx
- https://github.com/mrmurphy/html-to-reason
- https://github.com/arnabsen1729/rescript-react-starter
