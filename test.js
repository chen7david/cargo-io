global.c = (val) => console.log(val)
const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const { mutator, errors, logger } = require('./middleware')
const cargo = require('./cargo')
const Joi = require('joi')

const schema = Joi.object().options({ abortEarly: false, stripUnknown: true }).keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
})

router.get('/', async (ctx) => {
    const token = jwt.sign({}, 'secret', {expiresIn: '-1s'})
    // const { error, value } = schema.validate({})
    // if(error) ctx.throw(422, 'JoiValidationError', error)
    jwt.verify(token, 'secret')
    c(token)
    ctx.body = {}
})


/* ERROR HANDLING MIDDLEWARE */
app.use(cargo())
app.use(errors(mutator()))
app.on('error', logger)

app.use(router.routes())

app.listen(4000)