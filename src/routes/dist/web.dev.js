"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _homepageController = _interopRequireDefault(require("../controllers/homepageController.js"));

var _chatBotController = _interopRequireDefault(require("../controllers/chatBotController.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var initWebRoutes = function initWebRoutes(app) {
  router.get("/", _homepageController["default"].getHomepage);
  router.get("/webhook", _chatBotController["default"].getWebhook);
  router.post("/webhook", _chatBotController["default"].postWebhook);
  router.get("/profile", _homepageController["default"].getFacebookUserProfile); //Set up endpoint for collecting personal info and set up get started button & persistent menus

  router.post("/set-up-profile", _homepageController["default"].setUpUserFacebookProfile);
  return app.use("/", router);
};

var _default = initWebRoutes;
exports["default"] = _default;