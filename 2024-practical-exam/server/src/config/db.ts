const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(
    'supamenu_db',
    'postgres',
    'kabanda2005'
    , {
        host: 'localhost',
        dialect: 'postgres',
        logging: true,
    }
)

module.exports = sequelize 