'use strict';
const { Model } = require('sequelize');

const { encrypt } = require('../helpers/helper');
const moment = require('moment-timezone');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.SubscriptionPlan, {
        through: models.UserSubscriptionPlan,
      });

      // penerapan super-many-to-many
      // agar table ko-junction dapat ter-select
      User.hasMany(models.UserSubscriptionPlan);
    }

    getBirthDate() {
      return moment(this.birth_date).tz('Asia/Jakarta').format('YYYY-MM-DD');
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: 'Please input Your email',
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Please input your username',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Please input your password',
          },
        },
      },
      first_name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Please Enter your First Name',
          },
        },
      },
      last_name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Please enter your last name',
          },
        },
      },
      birth_date: {
        type: DataTypes.DATE,
        validate: {
          isDate: {
            msg: 'Please enter date format',
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please Choose your gender',
          },
        },
      },
      address1: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Please input your address',
          },
        },
      },
    },
    {
      sequelize,
      hooks: {
        beforeCreate: (instance, options) => {
          instance.password = encrypt(instance.password);
        },
        beforeUpdate: (instance, options) => {
          instance.password = encrypt(instance.password);
        },
      },
      modelName: 'User',
    }
  );

  // User.addHook("beforeCreate", (instance, options) => {
  // });

  // User.addHook("beforeUpdate", (instance, options) => {
  // });

  return User;
};
