'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SubscriptionPlans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      plan_type: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      subscriptionPeriod: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      prices: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      details: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.STRING,
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SubscriptionPlans');
  },
};
