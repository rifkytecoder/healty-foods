"use strict";

const app = require("express").Router();

const controller = require("../controllers/menu-controller");

app.get("/", controller.list);

module.exports = app;