const { logger, catcher, handler } = require('./middleware')
module.exports = {
    logger, catcher, handler,
    cargo: require('./cargo')
}