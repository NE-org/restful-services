import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/database.js';
import UserModel from './user.model.js';

const EmployeeLaptopModel = sequelize.define('employee_laptop', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstname: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  nationalId: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  laptopManufacturer: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  serialNumber: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  added_by: {
    type: DataTypes.UUID,
    references: {
      model: UserModel,
      key: 'id',
    },
    onUpdate: 'cascade',
    onDelete: 'cascade',
    allowNull: true,
  }
},{
    timestamps:true,
    tableName: "employee_laptop"
  },
);

sequelize.sync()
    .catch((error) => {
        logger.error('Error creating tables:', error)
})
export default EmployeeLaptopModel