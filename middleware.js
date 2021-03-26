module.exports = {

    handler: (cb) => async (err, ctx, next) => {

        if(cb) cb(err, ctx, next)
    
        /* DEFAULT EXCEPTION MUTATOR */
        if(Object.keys(ctx.cargo.details).length == 0){
            ctx.serial = Math.floor(Math.random()*90000) + 10000
            ctx.cargo.serial(ctx.serial).msg(`unknow error - ER${ctx.serial}`).status(500)
        }
    
        return ctx.cargo
    },

    catcher: (cb = null) => async (ctx, next) => {
        try {
            await next()
        } catch (err) {
            const data = cb ? await cb(err, ctx, next) : err.message 
            ctx.status = ctx.cargo.status || err.status || err.statusCode ||  500
            ctx.body = data
            ctx.app.emit('error', err, ctx)
        }
    },

    logger: (err, ctx) => {
        console.log(`ERR${ctx.serial}`,err)
    }
}