const app = new (require('koa'))
const router = require('koa-router')()
const { kcargo, kcatcher } = require('./cargo')

const handler = async (error, ctx, next) => {
    // handle errors here with the ctx.cargo object
}

app.use(kcatcher(handler))
app.use(kcargo())
app.use(router.routes())

router.get('/', async (ctx) => {
    /* VALIDATION */
    const validationErrors = [
        {key:'username', message:'invalid username'},
        {key:'password', message:'invalid password'}
    ]
    ctx.cargo.status(422)
    validationErrors.map(o => ctx.cargo.messages(o))
    ctx.cargo.error()

    ctx.body = ctx.cargo.status(201).message('object created').payload({})
})






app.listen(4000)



