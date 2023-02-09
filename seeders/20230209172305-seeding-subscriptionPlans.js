'use strict';

const subPlans = require('../subscriptionplans.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    subPlans.forEach((subPlan) => {
      let props = Object.keys(subPlan.details);
      let result = [];
      for (let i = 0; i < props.length; i++) {
        result.push(subPlan.details[props[i]]);
      }
      subPlan.details = result.join(';');
      subPlan.createdAt = new Date();
      subPlan.updatedAt = new Date();
    });

    return queryInterface.bulkInsert('SubscriptionPlans', subPlans, {});
  },

  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('SubscriptionPlans', null, {});
  },
};
