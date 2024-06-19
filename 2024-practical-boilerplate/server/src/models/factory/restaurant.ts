import { DataTypes, Model } from 'sequelize'
import { IRestaurant, TRestaurentStatus } from '../types'
const sequelize = require('../../config/db')

class Restaurant extends Model<IRestaurant> {
    public declare _id: string
    public declare title: string
    public declare location: string
    public declare status: TRestaurentStatus
    public declare thumbnail: string
    public declare description: string
    public declare rating: number
}

Restaurant.init({
    _id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['open', 'full', 'clowded', 'quiet', 'moderate']],
        },
    },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        }
    }
}, {
    sequelize,
    modelName: 'Restaurant',
    tableName: 'restaurants',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    }
)

sequelize.sync()
    .catch((error:any) => {
        console.error('Error creating tables:', error)
})

export default Restaurant