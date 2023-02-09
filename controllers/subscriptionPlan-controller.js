"use strict";

const {SubscriptionPlan, Menu, UserSubscriptionPlan, User} = require("../models");

class SubscriptionPlanController {
  static list(req, resp) {
    return SubscriptionPlan
      .findAll(
        {
          include: [
            Menu,
            UserSubscriptionPlan,
            User
          ]
        }
      )
      .then(subscriptionPlans => {
        resp.send(subscriptionPlans);
      })
      .catch(err => {
        resp.send(err);
      });
  }

  static getAddForm(req, res) {
    let query = req.query.subscriptionplan;
    req.session.query = query;

    let errors = req.session.errors || null;
    delete req.session.errors;

    return SubscriptionPlan
      .findOne({
        where: {
          plan_type: query
        }
      })
      .then(subscriptionPlan => {
        res.render('subscriptionplan-form-add', {subscriptionPlan, errors});
      })
      .catch(err => res.send(err));
  }

  static postAddForm(req, res) {
    let { email, username, password, first_name, last_name, birth_date, gender, address1, SubscriptionPlanId} = req.body

    let userId = null;

    return User.create({
      email, username, password, first_name, last_name, birth_date, gender, address1
    })
    .then(user => {
      return User.findOne({
        where: {
          email: user.email
        }
      })
    })
    .then(savedUser => {
      return UserSubscriptionPlan.create({
        SubscriptionPlanId, UserId: savedUser.id, isActive: true
      })
    })

    .then(UserSubscriptionPlan => res.redirect('/'))
    .catch(err => {
      if (err.name == "SequelizeValidationError") {
        let query = req.session.query;

        let errors = err.errors.map(element => element.message)
        req.session.errors = errors;
        
        res.redirect(`/subscriptionplans/add/?subscriptionplan=${query}`);
      } else {
        res.send(err);
      }
    })
  }

  static getUsers(req, resp) {
    let subscriptionPlanId = req.params[0];
    return User
      .findAll(
        {
          include: [
            {
              model: SubscriptionPlan,
              where: {
                id: subscriptionPlanId
              }
            }
          ]
        }
      )
      .then(users => {
        resp.send(users);
      })
      .catch(err => resp.send(err));
  }

  static create(req, resp) {
    // options get from req.body
    return SubscriptionPlan
      .create(
        options
      )
      .then(subscriptionPlan => {
        resp.send(subscriptionPlan);
      })
      .catch(err => {
        resp.send(err);
      });
  }

  static update(req, resp) {
    // options get from req.body
    // id get from req.params[0]
    return SubscriptionPlan
      .update(
        options,
        {
          where: { id }
        }
      )
      .then(subscriptionPlan => {
        resp.send(subscriptionPlan);
      })
      .catch(err => {
        resp.send(err);
      })
  }

  static destroy(req, resp) {
    // id get from req.params[0]
    return SubscriptionPlan
      .destroy(
        {
          where: { id }
        }
      )
      .then(subscriptionPlan => {
        resp.send(subscriptionPlan);
      })
      .catch(err => {
        resp.send(err);
      });
  }
}

module.exports = SubscriptionPlanController;