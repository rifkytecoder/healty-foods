"use strict";

const app = require("express").Router();

const controller = require("../controllers/index");

const menuRouter = require("../routers/menu-router");
const userRouter = require("../routers/user-router");
const subscriptionPlanRouter = require("../routers/subscriptionPlan-router");
const userSubscriptionPlanRouter = require("../routers/userSubscriptionPlan-router");

app.get("/", controller.index);

app.use("/menus", menuRouter);
app.use("/users", userRouter);
app.use("/subscriptionplans", subscriptionPlanRouter);
app.use("/usersubscriptionplans", userSubscriptionPlanRouter);

module.exports = app;