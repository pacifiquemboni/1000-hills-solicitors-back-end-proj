"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
var connectDB = _mongoose["default"].connect(process.env.MONGO_URI).then(console.log("MongoDB connected successfully!"))["catch"](function (err) {
  return console.log("Error happened: ".concat(err));
});
var _default = exports["default"] = connectDB;