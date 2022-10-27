const express = require("express");
const { getUsers } = require("../controllers/UserController");

const route = express.Router();

route.get("/users", getUsers);

module.exports = route;
