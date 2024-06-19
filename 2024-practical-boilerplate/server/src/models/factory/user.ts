import { DataTypes, Model } from 'sequelize'
import { IUser } from '../types'
const sequelize = require('../../config/db')

class User extends Model<IUser> {
    public declare _id: string
    public declare fullName: string
    public declare email: string
    public declare password: string | undefined
    public declare role: string
    public declare telephone: string
}

User.init(
    {
        _id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['admin', 'user']],
            },
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true,
                // 10 digits
                len: [10, 10],
            }
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
)

sequelize.sync().catch((error: any) => {
    console.error('Error creating tables:', error)
})

export default User
