'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('employee_laptop', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      firstname: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      nationalId: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      department: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      position: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      laptopManufacturer: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      model: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      serialNumber: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      added_by: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('employee_laptop');
  },
};
