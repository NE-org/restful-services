import { DataTypes, Model } from 'sequelize'
import { IOrders, TStatusPayment } from '../types'
import moment from 'moment'
const sequelize = require('../../config/db')
class Order extends Model<IOrders> {
    public declare _id: string
    public declare userId: string
    public declare productId: string
    public declare quantity: number
    public declare paymentStatus: TStatusPayment
    public declare total: number
    public declare paymentDate: Date
}

Order.init(
    {
        _id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        productId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        paymentStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['pending', 'paid', 'failed']],
            },
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        paymentDate: {
            type: DataTypes.DATE,
            get: function() {
                return moment.utc(this.getDataValue('paymentDate')).format('YYYY-MM-DD')
            },
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Order',
        tableName: 'orders',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
)

sequelize.sync().catch((error: any) => {
    console.error('Error creating tables:', error)
})

export default Order