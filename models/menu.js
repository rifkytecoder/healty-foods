'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Menu.belongsTo(models.SubscriptionPlan);
    }
  }
  Menu.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Please Enter Menus Name',
          },
        },
      },
      serving_time: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: 'Please Enter Serving Time',
          },
        },
      },
      SubscriptionPlanId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: 'Please Enter Subscription Plan Id',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Menu',
    }
  );
  return Menu;
};
