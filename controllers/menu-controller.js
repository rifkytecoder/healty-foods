"use strict";

const {Menu, SubscriptionPlan, UserSubscriptionPlan, User} = require("../models");

class MenuController {
  static list(req, resp) {
    return Menu
      .findAll(
        {
          include: [
            Menu,
            SubscriptionPlan,
            UserSubscriptionPlan,
            User
          ]
        }
      )
      .then(menus => {
        resp.send(menus);
      })
      .catch(err => {
        resp.send(err);
      });
  }

  static create(req, resp) {
    // options get from req.body
    return Menu
      .create(
        options
      )
      .then(menu => {
        resp.send(menu);
      })
      .catch(err => {
        resp.send(err);
      });
  }

  static update(req, resp) {
    // options get from req.body
    // id get from req.params[0]
    return Menu
      .update(
        options,
        {
          where: { id }
        }
      )
      .then(menu => {
        resp.send(menu);
      })
      .catch(err => {
        resp.send(err);
      });
  }

  static destroy(req, resp) {
    // id get from req.params[0]
    return Menu
      .destroy(
        {
          where: { id }
        }
      )
      .then(menu => {
        resp.send(menu);
      })
      .catch(err => {
        resp.send(err);
      });
  }
}

module.exports = MenuController;