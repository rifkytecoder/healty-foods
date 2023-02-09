'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSubscriptionPlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // penerapan super-many-to-many
      // agar table ko-junction dapat ter-select
      UserSubscriptionPlan.belongsTo(models.User);
      UserSubscriptionPlan.belongsTo(models.SubscriptionPlan);
    }
  }
  UserSubscriptionPlan.init(
    {
      UserId: DataTypes.INTEGER,
      SubscriptionPlanId: DataTypes.INTEGER,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'UserSubscriptionPlan',
    }
  );
  return UserSubscriptionPlan;
};
