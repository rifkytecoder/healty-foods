"use strict";

// deklarasi express
const express = require("express");

// deklarasi path
const path = require("path");

// deklarasi public folder
const publicFolder = path.join(__dirname, "public");

// deklarasi routers
const routers = require("./routers");

// deklarasi session
const session = require("express-session");

// invoke express
const app = express();

// set port => process.env.PORT diperlukan untuk penyesuaian env di heroku
app.set("port", process.env.PORT || 3000);

// set view engine => ejs
app.set("view engine", "ejs");

// set views folder => views
app.set("views", path.join(__dirname, "views"));

// middleware untuk handler body request
app.use(express.urlencoded({extended: false}));

// middleware session
app.use(session({
  secret: "Riky HIdayat Julian Raizif",
  resave: false,
  saveUninitialized: true
}));

// middleware untuk routing
app.use(routers);

// middleware untuk static folder
app.use(express.static(publicFolder));

// jalankan express
app.listen(app.get("port"), () => {
  console.log(`express run on ${app.get("port")}`);
});