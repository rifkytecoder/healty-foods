"use strict";

const app = require("express").Router();

const controller = require("../controllers/userSubscriptionPlan-controller");

app.get("/", controller.list);

module.exports = app;