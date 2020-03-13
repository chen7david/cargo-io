const supported_lang = ['en', 'zh']
const supported_states = ['info', 'warning', 'error', 'validation']

class Cargo {

    constructor(){
        this.id = Math.floor((Math.random() * 9000) + 1000)
        this.createdAt = new Date().toLocaleString()
        this.isCargo = true
    }

    detailsTo(details){
        this.details = details
        return this
    }

    payloadTo(payload){
        this.payload = payload
    }

    directive(directive){
        if(!this.directives) this.directives = []
        this.directives.push(directive)
        return this
    }

    static loadNotifications(Notification){
        this.notification = Notification
        return this
    }

    message(code, options){

    }
}

class Notification {
    constructor(code, options = null){
        if(options) const { lang, data } = options

        let notification = null
        
        if(this.store())
            notification = this.store().notifications.find(el => el.name == code)
        
        this.status = notification ? notification.status : 200
        this.code = code
        this.state = notification ? notification.state : 'unknown'
        this.lang = lang || 'en'
        this.messages = []
    }

    static loadStore(store){
        this.store = store
        return this
    }

    static loadErrorMutator(mutator){
        if(!this.errorMutators) this.errorMutators = []
        this.errorMutators.push(mutator)
        return this
    }

    errorMutators(){
        return this.constructor.errorMutators ?
            this.constructor.errorMutators : []
    }

    store(){
        return this.constructor.store ? 
        this.constructor.store : null
    }

    langTo(lang){
        if(supported_lang.includes(lang)) this.lang = lang
        return this
    }
}

module.exports = {
    Cargo, Notification
}





