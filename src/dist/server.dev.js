"use strict";

var _express = _interopRequireDefault(require("express"));

var _viewEngine = _interopRequireDefault(require("./config/viewEngine.js"));

var _web = _interopRequireDefault(require("./routes/web.js"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); //use body-parser to post data

app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
})); //config view engine

(0, _viewEngine["default"])(app); // init all web routes

(0, _web["default"])(app); // Sets server port and logs message on success

app.listen(process.env.PORT || 8080, function () {
  console.log("webhook is listening");
});