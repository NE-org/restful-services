import { DataTypes, Model } from 'sequelize'
import { IProduct, TStockStatus } from '../types'
const sequelize = require('../../config/db')

class Product extends Model<IProduct> {
    declare public _id: string
    declare public name: string
    declare public description: string
    declare public type: string
    declare public stockStatus: TStockStatus
    declare public price: number
    declare public quantity: number
    declare public thumbnail: string
    declare public menuId: string
}

Product.init(
    {
        _id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stockStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['available', 'not available']],
            },
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        menuId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        thumbnail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Product',
        tableName: 'products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
)

sequelize.sync().catch((error: any) => {
    console.error('Error creating tables:', error)
})

export default Product