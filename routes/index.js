"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

var _faq = require("./faq");

var _BlackFriday = require("./BlackFriday");

const routes = [_faq.faqRoutes, _BlackFriday.balckFridayRoutes];
exports.routes = routes;