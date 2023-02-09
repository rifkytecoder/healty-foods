"use strict";

const { Op } = require("sequelize");
const {compare} = require("../helpers/helper");

const {User, UserSubscriptionPlan, SubscriptionPlan, Menu} = require("../models");

class UserController {
  static list(req, resp) {
    return User
      .findAll(
        {
          include: [
            UserSubscriptionPlan,
            SubscriptionPlan
          ]
        }
      )
        .then(users => resp.render('user', { users } ))
        .catch(err => {
          resp.send(err);
        });
  }

  static getMenus(req, resp) {
    let userId = req.params[0];

    return SubscriptionPlan
      .findOne(
        {
          include: [{
            model: User,
            where: {
              id: userId
            }
          },
            Menu
          ]
        }
      )
      .then(subscriptionplan => {
        let menus = [...subscriptionplan.Menus];
        resp.send(menus);
      })
      .catch(err => {
        resp.send(err);
      });
  }

  static getSubscriptionPlan(req, resp) {
    let userId = req.params[0];
    
    return SubscriptionPlan
      .findOne(
        {
          include: {
            model: User,
            where: {
              id: userId
            }
          }
        }
      )
      .then(subscriptionplan => {
        resp.send(subscriptionplan);
      })
      .catch(err => {
        resp.send(err);
      });
  }

  static getDashboard(req, resp) {
    let id = Number(req.session.userId);

    return SubscriptionPlan
      .findOne(
        {
          include: [{
            model: User,
            where: {
              id
            }
          },
            Menu
          ]
        }
      )
      .then(subscriptionplan => {
        if (!subscriptionplan) {
          req.session.errors = [`Anda belum mempunya subscription`];
          resp.redirect("/users/login");
        } else {
          let menus = [...subscriptionplan.Menus];
          let user = subscriptionplan.Users[0];

          resp.render("user-dashboard", {user, menus, subscriptionplan});
        }
      })
      .catch(err => {
        eq.app.locals.errors = [err.messages];
        resp.redirect("/users/login");
      });
  }

  static login(req, resp) {
    if (req.method === "GET") {
      let errors = req.session.errors || null;
      delete req.session.errors;

      resp.render("user-form-login", {errors});
    } else if (req.method === "POST") {
      let {username, password} = req.body;

      return User
        .findOne(
          {
            where: {
              username,
            }
          }
        )
        .then(user => {
          if (!user) {
            req.session.errors = [`${username} tidak ditemukan`];
            req.session.LoginState = false;
            resp.redirect("/users/login");
          } else if (!compare(password, user.password)) {
            req.session.errors = [`Password yang di inputkan salah`];
            req.session.LoginState = false;
            resp.redirect("/users/login");
          } else {
            req.session.LoginState = true;
            req.session.userId = user.id;
            resp.redirect(`/users/dashboard`);

            // return SubscriptionPlan
            //   .findOne(
            //     {
            //       include: [{
            //         model: User,
            //         where: {
            //           id: user.id
            //         }
            //       },
            //         Menu
            //       ]
            //     }
            //   )
            //   .then(subscriptionplan => {
            //     if (!subscriptionplan) {
            //       req.session.errors = [`Anda belum mempunya subscription`];
            //       resp.redirect("/users/login");
            //     } else {
            //       let menus = [...subscriptionplan.Menus];
            //       let user = subscriptionplan.Users[0];

            //       resp.render("user-dashboard", {user, menus, subscriptionplan});
            //     }
            //   })
            //   .catch(err => {
            //     eq.app.locals.errors = [err.messages];
            //     resp.redirect("/users/login");
            //   });
          }
        })
        .catch(err => {
          req.session.errors = [err.messages];
          resp.redirect("/users/login");
        });
    }
  }

  static logout(req, resp) {
    delete req.session.LoginState;
    delete req.session.userId;
    resp.redirect("/users/login");
  }

  static create(req, resp) {
    // options get from req.body
    return User
      .create(
        options
      )
      .then(user => {
        resp.send(user);
      })
      .catch(err => {
        resp.send(err);
      });
  }

  static getFormEdit(req, resp) {
    let id = Number(req.session.userId);
    
    let errors = req.session.errors || null;
    delete req.session.errors;

    return User
      .findByPk(
        id
      )
      .then(data => {
        resp.render('userEdit', { data, errors });
      })
      .catch(err => resp.send(err))
  }

  static postFormEdit(req, res) {
    let id = Number(req.session.userId);
    let {email, username, password, first_name, last_name, birth_date, gender, address1} = req.body

    return User
      .update({
        email, username, password, first_name, last_name, birth_date, gender, address1
        }, {
          where: {
            id
          }
        })
        .then(() => {
          delete req.session.LoginState;
          delete req.session.userId;

          res.redirect("/users/login");
        })
        .catch(err => {
          req.session.errors = [err.messages];
          res.redirect("/users/dashboard/edit");
        });
  }

  static update(req, resp) {
    // options get from req.body
    // id get from req.params[0]
    return User
      .update(
        options,
        {
          where: { id }
        }
      )
      .then(user => {
        resp.send(user);
      })
      .catch(err => {
        resp.send(err);
      });
  }

  static destroy(req, resp) {
    // id get from req.params[0]
    return User
      .destroy(
        {
          where: { 
            id: req.params.id 
          }
        }
      )
      .then(() => {
        res.redirect('/users');
      })
      .catch(err => {
        req.session.errors = [err.messages];
        res.redirect("/users/login");
      })
  }
}

module.exports = UserController;