import { DataTypes, Model } from 'sequelize'
import { IMenu } from '../types'
const sequelize = require('../../config/db')

class Menu extends Model<IMenu> {
    public declare _id: string
    public declare name: string
    public declare restaurantId: string
    public declare description: string
    public declare icon: string
}

Menu.init(
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
        restaurantId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Menu',
        tableName: 'menus',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
)
sequelize.sync().catch((error: any) => {
    console.error('Error creating tables:', error)
})

export default Menu