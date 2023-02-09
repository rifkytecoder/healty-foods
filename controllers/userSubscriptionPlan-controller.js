"use strict";

const {UserSubscriptionPlan, User, SubscriptionPlan, Menu} = require("../models");

class UserSubscriptionPlanController {
  static list(req, resp) {
    return UserSubscriptionPlan
      .findAll(
        {
          include: [
            User,
            SubscriptionPlan,
            Menu
          ]
        }
      )
      .then(userSubscriptionPlans => {
        resp.send(userSubscriptionPlans);
      })
      .catch(err => {
        resp.send(err);
      });
  }

  static create(req, resp) {
    // options get from req.body
    return UserSubscriptionPlan
      .create(
        options
      )
      .then(userSubscriptionPlan => {
        resp.send(userSubscriptionPlan);
      })
      .catch(err => {
        resp.send(err);
      });
  }

  static update(req, resp) {
    // options get from req.body
    // id get from req.params[0]
    return UserSubscriptionPlan
      .update(
        options,
        {
          where: { id }
        }
      )
      .then(userSubscriptionPlan => {
        resp.send(userSubscriptionPlan);
      })
      .catch(err => {
        resp.send(err);
      });
  }

  static destroy(req, resp) {
    // id get from req.params[0]
    return UserSubscriptionPlan
      .destroy(
        {
          where: { id }
        }
      )
      .then(userSubscriptionPlan => {
        resp.send(userSubscriptionPlan);
      })
      .catch(err => {
        resp.send(err);
      });
  }
}

module.exports = UserSubscriptionPlanController;