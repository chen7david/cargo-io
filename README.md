# Cargo-IO
Simple structured response object for koa-js.

### Koa & Cargo
#### getting started
0. Create a node project
1. <code>$ npm i koa koa-router cargo-io</code>
2. <code>$ touch index.js</code>

#### index.js
```js
const app = new (require('koa'))
const router = require('koa-router')()
const { kcargo, kcatcher } = require('./cargo')
const port = process.env.PORT || 3000

app.use(kcargo())
app.use(kcatcher(handler))
app.use(router.routes())

app.listen(port)
```

#### Validation Error Response

```js
router.get('/', async (ctx) => {
    /* VALIDATION */
    const validationErrors = [
        {key:'username', message:'invalid username'},
        {key:'password', message:'invalid password'}
    ]
    ctx.cargo.status(422)
    validationErrors.map(o => ctx.cargo.messages(o))
    ctx.cargo.error() // Note: no code after this will run as it throws an error wich invokes the kcatcher middleware.
    
    ctx.body = ctx.body = ctx.cargo.status(201).message('object created').payload({})
})
```
###### output
```cmd
{
    "isCargo": true,
    "status": 422,
    "serial": 871000,
    "messages": [
        {
            "key": "username",
            "message": "invalid username"
        },
        {
            "key": "password",
            "message": "invalid password"
        }
    ],
    "state": "validation"
}
```