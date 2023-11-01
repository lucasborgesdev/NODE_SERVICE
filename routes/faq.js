"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.faqRoutes = void 0;

var _helpers = require("../helpers");

var _express = require("express");

var _controllers = require("../controllers");

var _services = require("../services");

var _middlewares = require("../middlewares");

const faqService = new _services.FaqService();
const faqController = new _controllers.FaqController(faqService);
const faqRoutes = (0, _express.Router)();
exports.faqRoutes = faqRoutes;
faqRoutes.post(_helpers.routeHelper.getRoutePath('/faq'), _middlewares.basicAuth, faqController.process);