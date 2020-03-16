const { timestamp, randInt } = require('funx-js')
class Cargo {

    constructor(){
        this.serial = randInt(5)
        this.createdAt = timestamp()
        this.isCargo = true
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

module.exports = { Cargo }





