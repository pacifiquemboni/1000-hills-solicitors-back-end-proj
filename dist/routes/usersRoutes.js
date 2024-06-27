"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _usersController = _interopRequireDefault(require("../controllers/usersController.js"));
var _authmiddleware = _interopRequireDefault(require("../middleware/authmiddleware.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var userRoute = _express["default"].Router();
userRoute.post("/register", _usersController["default"].registerUsers);
userRoute.get("/", _authmiddleware["default"].isAuthenticated, _authmiddleware["default"].checkAdminRole, _usersController["default"].getUsers);
userRoute.post("/verify/:token", _usersController["default"].verifyEmail);
//user login route
userRoute.post("/login", _usersController["default"].loginUser);
//get single user profile
userRoute.get("/:id",
// authmiddleware.isAuthenticated,
_usersController["default"].getSingleUser);
//update single user
userRoute.put("/:id", _authmiddleware["default"].isAuthenticated, _authmiddleware["default"].checkAdminRole, _usersController["default"].updateSingleUser);
//update password in profile
userRoute.patch("/:id", _authmiddleware["default"].isAuthenticated, _usersController["default"].updateUserPassword);
userRoute.post("/reset",
// authmiddleware.isAuthenticated,
_usersController["default"].resetPassword);
// for paraming token from user
userRoute.post("/reset/:token",
// authmiddleware.isAuthenticated,
_usersController["default"].paramsToken);
var _default = exports["default"] = userRoute;