"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  details: (source) => {
    let output = {};
    let sources = source.split(";");
    output.description = sources[0];
    output.mealType = sources[1];
    output.orderType = sources[2];
    output.features = sources[3];
    output.deliveryType = sources[4];
    return output;
  },

  displayRupiah: (source) => {
    return source.toLocaleString('id');
  },

  encrypt: (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  },

  compare: (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
  }
}