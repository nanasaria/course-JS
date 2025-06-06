const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const contatoController = require("./src/controllers/contatoController");

const { loginRequired } = require("./src/middlewares/middleware");

// Rotas da home
route.get("/", homeController.index);

// Rotas de login
route.get("/login/index", loginController.index);
route.post("/login/login", loginController.login);
route.post("/login/register", loginController.register);
route.get("/login/logout", loginController.logout);

// Rotas de contato
route.get("/contato/index", loginRequired, contatoController.index);
route.post("/contato/register", contatoController.register);
route.get("/contato/index/:id", contatoController.editIndex);
route.post("/contato/edit/:id", contatoController.edit);
route.get("/contato/delete/:id", contatoController.delete);


module.exports = route;
