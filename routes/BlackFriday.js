"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.balckFridayRoutes = void 0;

var _helpers = require("../helpers");

var _express = require("express");

var _controllers = require("../controllers");

var _services = require("../services");

var _middlewares = require("../middlewares");

const balckFridayService = new _services.BlackFridayService();
const blackFridayController = new _controllers.BlackFridayController(balckFridayService);
const balckFridayRoutes = (0, _express.Router)();
exports.balckFridayRoutes = balckFridayRoutes;
balckFridayRoutes.post(_helpers.routeHelper.getRoutePath('/black-friday'), _middlewares.basicAuth, blackFridayController.process);