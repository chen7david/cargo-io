const { timestamp, randInt } = require('funx-js')
class Cargo {

    constructor(){
        this.isCargo = true
        this.serial = randInt(5)
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

const cargomw = (req, res, next) => {
    if(!req.tools) req.tools = {}
    const cargo = new Cargo()
    req.tools.cargo = cargo
    next()
}

module.exports = { Cargo, cargomw }





