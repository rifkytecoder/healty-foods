'use strict';
const { Model } = require('sequelize');

const { details, displayRupiah } = require('../helpers/helper');

module.exports = (sequelize, DataTypes) => {
  class SubscriptionPlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubscriptionPlan.belongsToMany(models.User, {
        through: models.UserSubscriptionPlan,
      });
      SubscriptionPlan.hasMany(models.Menu);

      // penerapan super-many-to-many
      // agar table ko-junction dapat ter-select
      SubscriptionPlan.hasMany(models.UserSubscriptionPlan);
    }

    getDescription() {
      let output = details(this.details);
      return output.description;
    }

    getMealType() {
      let output = details(this.details);
      return output.mealType;
    }

    getOrderType() {
      let output = details(this.details);
      return output.orderType;
    }

    getFeatures() {
      let output = details(this.details);
      return output.features;
    }

    getDeliveryType() {
      let output = details(this.details);
      return output.deliveryType;
    }

    displayRupiah() {
      return displayRupiah(this.prices);
    }
  }
  SubscriptionPlan.init(
    {
      plan_type: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Please Enter Plan Type',
          },
        },
      },
      subscriptionPeriod: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: 'Please Enter Subscription Period',
          },
        },
      },
      prices: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: 'Please Enter The Price',
          },
        },
      },
      details: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Please Enter the details of plans',
          },
        },
      },
      url: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Please enter the url',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'SubscriptionPlan',
    }
  );
  return SubscriptionPlan;
};
