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
const { handler, catcher, logger, cargo } = require('cargo-io')
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
app.use(catcher(handler(extender)))
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

### Example Extender Function
```js

const { ValidationError } = require('joi')
const { UniqueViolationError } = require('objection')
const { JsonWebTokenError } = require('jsonwebtoken')

module.exports = async (err, ctx, next) => {

        if(err instanceof ValidationError){
            const { details, _original } = err
            ctx.cargo.original(_original).state('validation').status(422)
            details.map(d => ctx.cargo.loadmsg(d.context.key, d.message))
            ctx.cargo
        }
        
        if(err instanceof UniqueViolationError){
            let key = err.columns.pop()
            ctx.cargo.original(ctx.request.body).state('validation').status(422)
            ctx.cargo.loadmsg(key, `this ${key} is already taken`)
        }
        
        if(err instanceof JsonWebTokenError){
            if(err.message == 'invalid signature') ctx.cargo.status(401).msg('invalid token signature')
            if(err.message == 'jwt expired') ctx.cargo.status(401).msg('token expired')
            if(err.message == 'jwt malformed') ctx.cargo.status(401).msg('invalid token format')
            if(err.message == 'jwt must be provided') ctx.cargo.status(401).msg('token missing')
        }
        
        /* DEFAULT EXCEPTION MUTATOR */
        if(Object.keys(ctx.cargo.details).length == 0){
            ctx.serial = Math.floor(Math.random()*90000) + 10000
            ctx.cargo.serial(ctx.serial).msg(`unknow error - ER${ctx.serial}`).status(500)
        }
}
```