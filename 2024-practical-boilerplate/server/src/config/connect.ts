import logger from '../common/logger'
const sequelize = require('./db')

export const establishConnection = async () => {
    try {
        await sequelize.authenticate()
        logger.info('Connection has been established successfully! 🚀')
    }
    catch (error) {
        logger.error('Unable to connect to the database:', error)
    }
}