"use strict";

const {SubscriptionPlan, Menu, UserSubscriptionPlan, User} = require("../models");

class HomePage {
  static index(req, resp) {
    if (req.method !== "GET") resp.send("error");
    else {
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
      .then(subscriptionplans => {
        resp.render("index", {subscriptionplans});
      })
      .catch(err => {
        resp.send(err);
      });
    }
  }
}

module.exports = HomePage;