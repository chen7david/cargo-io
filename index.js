const { timestamp, serialInt } = require('funx-js')

class Cargo {

    constructor(){
        this.isCargo = true
        this.serial = serialInt("00000")
        this.createdAt = timestamp()
    }

    details(details){
        this.details = details
        return this
    }

    payload(payload){
        this.payload = payload
        return this
    }

    status(status){
        this.status = status
        return this
    }

    directive(directive){
        if(!this.directives) this.directives = []
        this.directives.push(directive)
        return this
    }
}

exports = module.exports = () => (req, res, next) => {
    if(!req.tools) req.tools = {}
    const cargo = new Cargo()
    req.tools.cargo = cargo
    next()
} 

exports = { Cargo }





