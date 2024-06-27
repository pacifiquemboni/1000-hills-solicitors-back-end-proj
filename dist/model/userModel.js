"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Schema = _mongoose["default"].Schema;
var userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  idNo: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    "default": "client"
  },
  phoneNumber: {
    type: String,
    required: true
  },
  preferredContact: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  sector: {
    type: String,
    required: true
  },
  cell: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    "default": false // Initially set as unverified
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  updatedAt: {
    type: Date,
    "default": Date.now
  },
  resetToken: String,
  resetTokenExpiration: Date
});
var User = _mongoose["default"].model('User', userSchema);
var _default = exports["default"] = User;