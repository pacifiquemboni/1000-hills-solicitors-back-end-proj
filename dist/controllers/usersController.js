"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _userModel = _interopRequireDefault(require("../model/userModel.js"));
var _verify = _interopRequireDefault(require("../varidation/verify.js"));
var _jwt = require("../helper/jwt.js");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
//  Assuming the model is defined as 'User'
// Function to send verification email
function sendVerificationEmail(_x, _x2) {
  return _sendVerificationEmail.apply(this, arguments);
}
function _sendVerificationEmail() {
  _sendVerificationEmail = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(email, token) {
    var transporter, mailConfigurations;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          transporter = _nodemailer["default"].createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD
            }
          });
          mailConfigurations = {
            // It should be a string of sender/server email
            from: "EMAIL_USERNAME",
            to: email,
            // Subject of Email
            subject: "Email Verification",
            // This would be the text of email body
            html: "\n     <div style=\"width: 100%; height: 60vh;  \">\n    <div style=\"width: 80%; max-width: 600px; margin: auto;border-bottom: 1px solid;\">\n      <img src=\"https://res.cloudinary.com/dndfvxckz/image/upload/v1718273194/t8y9k778uea4tlzcidnn.jpg\" style=\"width: 100%; height: 200px; display: block; margin: auto;\">\n    </div>\n    <hr style=\"border: 1px silid black;\">\n    <div style=\"width: 80%; max-width: 600px; margin: auto; text-align: left; font-family: Arial, sans-serif;\">\n      <p style=\"font-size: 16px;\">Hi! ".concat(email, ",</p>\n      <p style=\"font-size: 16px;\">Thank you for your interest in our organization! You are almost done with the sign-up process.</p>\n      <p style=\"font-size: 16px;\">Please <a href=\"").concat(process.env.FRONT_END_URL, "/verify.html?token=").concat(token, "&email=").concat(email, "\" target=\"_blank\" style=\"color: #007bff; text-decoration: none;\">click here</a> to confirm your account.</p>\n    </div>\n   <div style=\"width: 80%; max-width: 600px;background-color: #00171F;color: white; margin: auto;height: 60px; text-align: center; margin-top: 20px; font-family: Arial, sans-serif;border-bottom: 1px solid;\">\n      <p style=\"font-size: 16px;padding: 15px;\">Thanks!</p>\n    </div>\n  </div>\n    \n    \n    ")
          };
          transporter.sendMail(mailConfigurations, function (error, info) {
            // if (error) throw Error(error);
            console.log("Email Sent Successfully");
          });
        case 3:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return _sendVerificationEmail.apply(this, arguments);
}
var UsersController = /*#__PURE__*/function () {
  function UsersController() {
    _classCallCheck(this, UsersController);
  }
  return _createClass(UsersController, null, [{
    key: "registerUsers",
    value: function () {
      var _registerUsers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
        var _req$body, idNo, email, firstName, lastName, password, role, phoneNumber, preferredContact, district, sector, cell, existingUser, token, registerUser;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, idNo = _req$body.idNo, email = _req$body.email, firstName = _req$body.firstName, lastName = _req$body.lastName, password = _req$body.password, role = _req$body.role, phoneNumber = _req$body.phoneNumber, preferredContact = _req$body.preferredContact, district = _req$body.district, sector = _req$body.sector, cell = _req$body.cell; // Check if user with the email already exists
              _context.next = 4;
              return _userModel["default"].findOne({
                email: email
              });
            case 4:
              existingUser = _context.sent;
              if (!existingUser) {
                _context.next = 7;
                break;
              }
              return _context.abrupt("return", res.status(409).json({
                status: "fail",
                message: "Email already exists"
              }));
            case 7:
              if (_verify["default"].verifyId(idNo)) {
                _context.next = 9;
                break;
              }
              return _context.abrupt("return", res.status(400).json({
                status: "fail",
                message: "Your national identity card number should have 16 characters."
              }));
            case 9:
              if (_verify["default"].validateEmail(email)) {
                _context.next = 11;
                break;
              }
              return _context.abrupt("return", res.status(400).json({
                status: "fail",
                message: "Invalid email address. Please enter a valid email."
              }));
            case 11:
              if (_verify["default"].verifyStrongPassword(password)) {
                _context.next = 13;
                break;
              }
              return _context.abrupt("return", res.status(400).json({
                status: "fail",
                message: "Password not strong enough. Your password should contain at least one uppercase letter, one lowercase letter, one digit, one special character, and should be between 8 and 16 characters long."
              }));
            case 13:
              if (!(!idNo || !email || !firstName || !lastName || !password || !phoneNumber || !preferredContact || !district || !sector || !cell)) {
                _context.next = 15;
                break;
              }
              return _context.abrupt("return", res.status(400).json({
                status: "fail",
                message: "All fields are required"
              }));
            case 15:
              // Generate token for email verification
              token = _jsonwebtoken["default"].sign({
                email: email,
                idNo: idNo,
                role: role
              }, process.env.JWT_SECRET, {
                expiresIn: "1d"
              }); // Token expires in 1 day
              // Send verification email with token
              _context.next = 18;
              return sendVerificationEmail(email, token);
            case 18:
              _context.next = 20;
              return _userModel["default"].create({
                idNo: idNo,
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                role: role,
                phoneNumber: phoneNumber,
                preferredContact: preferredContact,
                district: district,
                sector: sector,
                cell: cell
              });
            case 20:
              registerUser = _context.sent;
              return _context.abrupt("return", res.status(200).json({
                status: "success",
                message: "Verification email sent",
                data: registerUser
              }));
            case 24:
              _context.prev = 24;
              _context.t0 = _context["catch"](0);
              console.error("Error registering user:", _context.t0);
              res.status(500).json({
                status: "fail",
                error: "Failed to register user"
              });
            case 28:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 24]]);
      }));
      function registerUsers(_x3, _x4) {
        return _registerUsers.apply(this, arguments);
      }
      return registerUsers;
    }()
  }, {
    key: "getUsers",
    value: function () {
      var _getUsers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
        var allUsers;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _userModel["default"].find();
            case 3:
              allUsers = _context2.sent;
              return _context2.abrupt("return", res.status(200).json({
                data: allUsers,
                message: "All users"
              }));
            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);
              return _context2.abrupt("return", res.status(500).json({
                message: "Failed to access to db"
              }));
            case 11:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 7]]);
      }));
      function getUsers(_x5, _x6) {
        return _getUsers.apply(this, arguments);
      }
      return getUsers;
    }()
  }, {
    key: "getSingleUser",
    value: function () {
      var _getSingleUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
        var singleUser;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _userModel["default"].findOne({
                _id: req.params.id
              });
            case 3:
              singleUser = _context3.sent;
              if (singleUser) {
                _context3.next = 6;
                break;
              }
              return _context3.abrupt("return", res.status(400).json({
                status: "Fail",
                message: "user with that Id does not exist!"
              }));
            case 6:
              return _context3.abrupt("return", res.status(200).json({
                status: "success",
                message: "User Profile exist",
                data: singleUser
              }));
            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(500).json({
                status: "Fail",
                message: _context3.t0.message
              }));
            case 12:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 9]]);
      }));
      function getSingleUser(_x7, _x8) {
        return _getSingleUser.apply(this, arguments);
      }
      return getSingleUser;
    }()
  }, {
    key: "updateSingleUser",
    value: function () {
      var _updateSingleUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
        var _req$body2, idNo, firstName, lastName, phoneNumber, preferredContact, district, sector, cell, userFound;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _req$body2 = req.body, idNo = _req$body2.idNo, firstName = _req$body2.firstName, lastName = _req$body2.lastName, phoneNumber = _req$body2.phoneNumber, preferredContact = _req$body2.preferredContact, district = _req$body2.district, sector = _req$body2.sector, cell = _req$body2.cell;
              _context4.next = 4;
              return _userModel["default"].findOne({
                _id: req.params.id
              });
            case 4:
              userFound = _context4.sent;
              if (idNo) {
                userFound.idNo = idNo;
              }
              if (firstName) {
                userFound.firstName = firstName;
              }
              if (lastName) {
                userFound.lastName = lastName;
              }
              if (phoneNumber) {
                userFound.phoneNumber = phoneNumber;
              }
              if (preferredContact) {
                userFound.preferredContact = preferredContact;
              }
              if (district) {
                userFound.district = district;
              }
              if (sector) {
                userFound.sector = sector;
              }
              if (cell) {
                userFound.cell = cell;
              }
              userFound.updatedAt = new Date();
              if (!req.body.email) {
                _context4.next = 16;
                break;
              }
              return _context4.abrupt("return", res.status(400).json({
                status: "bad request",
                message: "email can not be updated"
              }));
            case 16:
              _context4.next = 18;
              return userFound.save();
            case 18:
              return _context4.abrupt("return", res.status(200).json({
                status: "sucess",
                message: "profile updated successfully",
                data: userFound
              }));
            case 21:
              _context4.prev = 21;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", res.status(500).json({
                status: "internal server error",
                error: err.message
              }));
            case 24:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 21]]);
      }));
      function updateSingleUser(_x9, _x10) {
        return _updateSingleUser.apply(this, arguments);
      }
      return updateSingleUser;
    }()
  }, {
    key: "updateUserPassword",
    value: function () {
      var _updateUserPassword = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
        var _req$body3, oldPassword, newPassword, userFound;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _req$body3 = req.body, oldPassword = _req$body3.oldPassword, newPassword = _req$body3.newPassword;
              _context5.next = 4;
              return _userModel["default"].findOne({
                _id: req.params.id
              });
            case 4:
              userFound = _context5.sent;
              if (!(oldPassword !== userFound.password)) {
                _context5.next = 7;
                break;
              }
              return _context5.abrupt("return", res.status(400).json({
                stautus: "Fail",
                message: "old password is not correct"
              }));
            case 7:
              userFound.password = newPassword;
              _context5.next = 10;
              return userFound.save();
            case 10:
              return _context5.abrupt("return", res.status(200).json({
                data: userFound.password,
                message: "Password Updated successfully"
              }));
            case 13:
              _context5.prev = 13;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", res.status(500).json({
                status: "fail",
                message: _context5.t0.message
              }));
            case 16:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 13]]);
      }));
      function updateUserPassword(_x11, _x12) {
        return _updateUserPassword.apply(this, arguments);
      }
      return updateUserPassword;
    }()
  }, {
    key: "verifyEmail",
    value: function () {
      var _verifyEmail = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
        var token, decoded, email, user;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              token = req.params.token; // Verify the JWT token
              decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET); // Extract email from the decoded token
              email = decoded.email; // Update the 'verified' column to true for the user with the provided email
              _context6.next = 6;
              return _userModel["default"].findOneAndUpdate({
                email: email
              }, {
                $set: {
                  verified: true
                }
              }, {
                "new": true
              });
            case 6:
              user = _context6.sent;
              if (user) {
                _context6.next = 9;
                break;
              }
              return _context6.abrupt("return", res.status(404).json({
                status: "fail",
                message: "User not found"
              }));
            case 9:
              return _context6.abrupt("return", res.status(200).json({
                data: user,
                status: "success",
                message: "Email verified successfully"
              }));
            case 12:
              _context6.prev = 12;
              _context6.t0 = _context6["catch"](0);
              console.error("Error verifying email:", _context6.t0);
              // Send internal server error response
              return _context6.abrupt("return", res.status(500).json({
                status: "fail",
                error: "Internal server error"
              }));
            case 16:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 12]]);
      }));
      function verifyEmail(_x13, _x14) {
        return _verifyEmail.apply(this, arguments);
      }
      return verifyEmail;
    }()
  }, {
    key: "loginUser",
    value: function () {
      var _loginUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
        var _req$body4, email, password, userFound, token;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _req$body4 = req.body, email = _req$body4.email, password = _req$body4.password;
              _context7.next = 4;
              return _userModel["default"].findOne({
                email: email
              });
            case 4:
              userFound = _context7.sent;
              if (userFound) {
                _context7.next = 7;
                break;
              }
              return _context7.abrupt("return", res.status(404).json({
                status: "fail",
                message: "Account does not exist"
              }));
            case 7:
              if (!(password !== userFound.password)) {
                _context7.next = 9;
                break;
              }
              return _context7.abrupt("return", res.status(400).json({
                status: "fail",
                message: "Incorect credentials"
              }));
            case 9:
              if (!(userFound.verified !== true)) {
                _context7.next = 11;
                break;
              }
              return _context7.abrupt("return", res.status(400).json({
                status: "Fail",
                message: "Your Acccount is not verified!🤷‍♀️"
              }));
            case 11:
              token = _jwt.JWT.generateJwt({
                userId: userFound._id,
                role: userFound.role,
                email: userFound.email,
                firstName: userFound.firstName,
                isernid: userFound.idNo
              });
              return _context7.abrupt("return", res.status(200).json({
                status: "success",
                message: "Logged in successfully",
                token: token,
                role: userFound.role,
                user: {
                  userId: userFound._id,
                  role: userFound.role,
                  email: userFound.email,
                  firstName: userFound.firstName,
                  isernid: userFound.idNo
                }
              }));
            case 15:
              _context7.prev = 15;
              _context7.t0 = _context7["catch"](0);
              return _context7.abrupt("return", res.status(500).json({
                status: "error",
                message: _context7.t0.message
              }));
            case 18:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 15]]);
      }));
      function loginUser(_x15, _x16) {
        return _loginUser.apply(this, arguments);
      }
      return loginUser;
    }()
  }, {
    key: "resetPassword",
    value: function () {
      var _resetPassword = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
        var email, findUser, token, transporter, mailOptions;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              email = req.body.email;
              _context8.next = 4;
              return _userModel["default"].findOne({
                email: email
              });
            case 4:
              findUser = _context8.sent;
              if (findUser) {
                _context8.next = 7;
                break;
              }
              return _context8.abrupt("return", res.status(400).json({
                message: "User not found"
              }));
            case 7:
              token = _jsonwebtoken["default"].sign({
                userId: findUser._id
              }, process.env.JWT_SECRET, {
                expiresIn: "1h"
              });
              findUser.resetToken = token;
              findUser.resetTokenExpiration = Date.now() + 3600000; // 1 hour
              _context8.next = 12;
              return findUser.save();
            case 12:
              console.log("Token generated:", token);
              console.log("Token expiration:", new Date(findUser.resetTokenExpiration).toISOString());
              transporter = _nodemailer["default"].createTransport({
                service: "gmail",
                auth: {
                  user: process.env.EMAIL_USERNAME,
                  pass: process.env.EMAIL_PASSWORD
                }
              });
              mailOptions = {
                to: findUser.email,
                from: process.env.EMAIL_USERNAME,
                subject: "Password Reset",
                html: "<div style=\"width: 100%; height: 60vh;  \">\n    <div style=\"width: 80%; max-width: 600px; margin: auto;border-bottom: 1px solid;\">\n      <img src=\"https://res.cloudinary.com/dndfvxckz/image/upload/v1718273194/t8y9k778uea4tlzcidnn.jpg\" style=\"width: 100%; height: 200px; display: block; margin: auto;\">\n    </div>\n    <div style=\"width: 80%; max-width: 600px; margin: auto; text-align: left; font-family: Arial, sans-serif;\">\n      <p style=\"font-size: 16px;\">Hi! ".concat(email, ",</p>\n      <p style=\"font-size: 16px;\">You requested a password reset. Click the following link to reset your password:<a href=\"").concat(process.env.FRONT_END_URL, "/resetPassword.html?token=").concat(token, "\">Link</a>.</p>\n      <p>This link will expire ").concat(new Date(findUser.resetTokenExpiration).toISOString(), "</p>\n    </div>\n    <div style=\"width: 80%; max-width: 600px;background-color: #00171F;color: white; margin: auto;height: 60px; text-align: center; margin-top: 20px; font-family: Arial, sans-serif;border-bottom: 1px solid;\">\n      <p style=\"font-size: 16px;padding: 15px;\">Thanks!</p>\n    </div>\n  </div> ")
              };
              transporter.sendMail(mailOptions, function (err, info) {
                if (err) return res.status(500).json({
                  status: "fail",
                  message: err.error
                });
              });
              res.status(200).json({
                status: "success",
                message: "Reset email sent"
              });
              _context8.next = 23;
              break;
            case 20:
              _context8.prev = 20;
              _context8.t0 = _context8["catch"](0);
              return _context8.abrupt("return", res.status(500).json({
                status: "error",
                message: _context8.t0.message
              }));
            case 23:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 20]]);
      }));
      function resetPassword(_x17, _x18) {
        return _resetPassword.apply(this, arguments);
      }
      return resetPassword;
    }()
  }, {
    key: "paramsToken",
    value: function () {
      var _paramsToken = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
        var token, password, decodedToken, user;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              token = req.params.token;
              password = req.body.password;
              _context9.prev = 2;
              decodedToken = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
              console.log("Decoded token:", decodedToken);
              _context9.next = 7;
              return _userModel["default"].findOne({
                _id: decodedToken.userId,
                resetToken: token,
                resetTokenExpiration: {
                  $gt: Date.now()
                }
              });
            case 7:
              user = _context9.sent;
              if (user) {
                _context9.next = 11;
                break;
              }
              console.log("Invalid or expired token");
              return _context9.abrupt("return", res.status(400).send("Invalid or expired token"));
            case 11:
              // Hash the password before saving
              // const hashedPassword = await bcrypt.hash(password, 12);
              user.password = password;
              user.resetToken = undefined;
              user.resetTokenExpiration = undefined;
              _context9.next = 16;
              return user.save();
            case 16:
              res.status(200).json({
                message: "Password reset successful"
              });
              _context9.next = 23;
              break;
            case 19:
              _context9.prev = 19;
              _context9.t0 = _context9["catch"](2);
              console.log("Error verifying token:", _context9.t0.message);
              return _context9.abrupt("return", res.status(400).send({
                message: "Invalid or expired token"
              }));
            case 23:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[2, 19]]);
      }));
      function paramsToken(_x19, _x20) {
        return _paramsToken.apply(this, arguments);
      }
      return paramsToken;
    }()
  }]);
}();
var _default = exports["default"] = UsersController;