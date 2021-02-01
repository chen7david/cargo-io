const { logger, mutator, errors } = require('./middleware')
module.exports = {
    logger,
    mutator,
    errors,
    cargo: require('./cargo')
}