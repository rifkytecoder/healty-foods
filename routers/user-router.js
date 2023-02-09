"use strict";

const app = require("express").Router();

const controller = require("../controllers/user-controller");

function checkLogin(req, resp, next) {
  if (req.session.LoginState && req.session.userId) {
    next();
  } else {
    req.session.errors = [`Anda belum login`];
    resp.redirect("/users/login");
  }
}

function pageLogin(req, resp, next) {
  if (req.session.LoginState && req.session.userId) {
    resp.redirect("/users/dashboard");
  } else {
    next();
  }
}

app.get("/", controller.list);

app.get(/^\/(\d+)\/menus$/m, controller.getMenus);

app.get(/^\/(\d+)\/subscription$/m, controller.getSubscriptionPlan);

app.get("/dashboard", checkLogin, controller.getDashboard);

app.get("/dashboard/edit", checkLogin, controller.getFormEdit);

app.post("/edit/:id", controller.postFormEdit);

app.get("/login", pageLogin, controller.login);

app.post("/login", controller.login);

app.get("/logout", controller.logout);

module.exports = app;