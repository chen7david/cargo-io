const catcher = (cb = null) => async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        errorCode = ctx.cargo._serial
        if(cb) await cb(error, ctx, next)
        const { _message, _messages } = ctx.cargo
        v({ _message, _messages })
        if(!_message && !_messages) ctx.cargo.status(500).message(`unknown error: E${errorCode}`)
        ctx.status = ctx.cargo.getStatus() != 200 ? ctx.cargo.getStatus() : 500
        console.log({errorCode, error})
        ctx.app.emit('error', error)
        ctx.body = ctx.cargo
    }
}


class CargoError extends Error {
    constructor(msg){
        super(msg)
    }
}

class Cargo {
    constructor(){
        this.isCargo = true
        this._status = 200
        this._serial =  Math.floor(100000 + Math.random() * 999999)
    }

    messages({key, message}){
        if(!this._messages) this._messages = []
        this._messages.push({key, message})
        return this
    }

    original(original = null){
        if(original) this._original = original
        return this
    }

    message(message = null){
        if(!message) throw(new CargoError('message() was called but no string was proviced'))
        this._message = message
        return this
    }

    error(message = 'not specified'){
        if(this._status == 200) this._status = 500
        this._message = this._message || message
        throw(new CargoError(this._message))
    }

    getStatus(){
        return this._status
    }

    state(state = null){
        if(state) this._state = state
        return this
    }

    status(code = null){
        if(!code) throw(new CargoError('status() was called but no code was proviced'))
        this._status = code
        return this
    }

    payload(data = null){
        if(data) this._payload = data
        return this
    }

    setState(){
        if(!this._state){
            if(this._status <= 230) this._state = 'success'
            if(this._status >= 231 && this._status < 400) this._state = 'warning'
            if(this._status > 400) this._state = 'danger'
            if(this._status == 422) this._state = 'validation'
        }
    }

    toJSON(){
        this.setState()
        const replace = Object.keys(this).filter(o => o[0]== '_')
        if(this._state == 'validation') delete this._message
        replace.forEach(k => {
            this[k.replace('_', '')] = this[k]
            delete this[k]
        })
        return this
    }
}

exports = module.exports = () => async (ctx, next) => {
    ctx.cargo = new Cargo()
    await next()
}


exports.kcatcher = catcher
exports.Cargo = Cargo
exports.CargoError = CargoError
exports.kcargo = () => async (ctx, next) => {
    ctx.cargo = new Cargo()
    await next()
}