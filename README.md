# Cargo-IO
Structured response object.

### 1. Use as in your Project
```js

const { Cargo } = require('cargo-io')

const cargo = new Cargo()
cargo.payload(somePayload)

```

### 2. Use as Koa Middleware
```js
const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const { mutator, errors, logger, cargo } = require('cargo-io')
const Joi = require('joi')

router.get('/', async (ctx) => {
    const { error, value } = schema.validate({})
    if(error) ctx.throw(422, 'JoiValidationError', error)
    ctx.body = {}
})


router.get('/', async (ctx) => {
    const { username } = ctx.request.body
    const user = await User.query()
        .where('username', username)
        .orWhere('email', username)
        .first()
    if(!user) ctx.cargo.original(ctx.request.body).state('validation')
            .loadmsg('username', 'username not found').error(422)
    ctx.body = {}
})


router.get('/', async (id, ctx, next) => {
    const user = await User.query().where('id', id).first()
    if(!user) ctx.cargo.msg('invalid user id').error(422)
    ctx.state.user = user
    await next()
})


/* ERROR HANDLING MIDDLEWARE */
app.use(cargo())
app.use(errors(mutator()))
app.on('error', logger)

app.use(router.routes())

app.listen(4000)
```

```js
module.exports = {
  
    validateBody: (schema) => async (ctx, next) => {
        try {
            const body = ctx.request.body
            const { error, value } = schema.validate(body)
            if(error) ctx.throw(422, 'JoiValidationError', error)
            ctx.request.body = value
            await next()
        } catch (err) {
            ctx.throw(500, 'SystemError', err) 
        }
    }, 
    schema
}
```
