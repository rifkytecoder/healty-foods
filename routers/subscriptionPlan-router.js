"use strict";

const app = require("express").Router();

const controller = require("../controllers/subscriptionPlan-controller");

app.get("/", controller.list);

app.get('/add', controller.getAddForm);

app.post('/add', controller.postAddForm);

app.get(/^\/(\d+)\/users$/m, controller.getUsers);

module.exports = app;