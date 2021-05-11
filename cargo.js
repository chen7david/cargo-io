class Cargo {

    constructor(){
        this.isCargo = true
        this.details = {}
    }

    status(status){
        this.status = status
        this.defaultState()
        return this
    }

    serial(serial){
        this.serial = serial
        return this
    }

    state(state){
        this.details.state = state
        return this
    }

    defaultState(){
        const {messages, state} = this.details
        if(!this.status || messages || state) return 
        const status = this.status
        let _state = 'success'
        if(status == 200) _state = 'success'
        if(status == 201) _state = 'info'
        if(status == 422) _state = 'warning'
        if(status == 401) _state = 'danger'
        this.state(_state)
    }

    error(status){
        this.status = status
        this.defaultState()
        const error = new Error({status})
        throw(error)
    }

    original(original){
        this.details.original = original
        return this
    }

    payload(data = null){
        this.payload = data
        return this
    }

    msg(message = ''){
        this.details.message = message
        return this
    }

    loadmsg(key, message = ''){
        if(!this.details.messages) this.details.messages = []
        this.details.messages.push({key, message})
        return this
    }
}

module.exports = () => async (ctx, next) => {
    ctx.cargo = new Cargo()
    await next()
}