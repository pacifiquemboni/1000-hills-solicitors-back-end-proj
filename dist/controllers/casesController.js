"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _pdfkit = _interopRequireDefault(require("pdfkit"));
var _fs = _interopRequireDefault(require("fs"));
var _caseModel = _interopRequireDefault(require("../model/caseModel"));
var _multer = _interopRequireDefault(require("multer"));
var _cloudinary = _interopRequireDefault(require("../cloudinary/cloudinary.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Import the path module
var casesCotroller = /*#__PURE__*/function () {
  function casesCotroller() {
    _classCallCheck(this, casesCotroller);
  }
  return _createClass(casesCotroller, null, [{
    key: "registerCases",
    value: // register cases
    function () {
      var _registerCases = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
        var _req$body, caseType, caseSubtype, summary, caseOwner, userId, resourceType;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body = req.body, caseType = _req$body.caseType, caseSubtype = _req$body.caseSubtype, summary = _req$body.summary;
              if (req.file) {
                _context2.next = 4;
                break;
              }
              return _context2.abrupt("return", res.status(400).json({
                error: "No file uploaded"
              }));
            case 4:
              // Ensure that the user is authenticated and the email is attached to req.user
              caseOwner = req.user.email;
              if (caseOwner) {
                _context2.next = 7;
                break;
              }
              return _context2.abrupt("return", res.status(401).json({
                error: "Unauthorized"
              }));
            case 7:
              userId = req.user.userId; // Determine the resource type based on MIME type
              resourceType = 'image';
              if (req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/gif') {
                resourceType = 'raw';
              }

              // Upload file to Cloudinary
              _cloudinary["default"].uploader.upload(req.file.path, {
                resource_type: resourceType
              }, /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(err, result) {
                  var registeredCase;
                  return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        if (!err) {
                          _context.next = 3;
                          break;
                        }
                        console.error("Error uploading file:", err);
                        return _context.abrupt("return", res.status(500).json({
                          success: false,
                          message: "File upload error"
                        }));
                      case 3:
                        console.log("File uploaded successfully:", result);

                        // Save case details in the database
                        _context.next = 6;
                        return _caseModel["default"].create({
                          caseType: caseType,
                          caseSubtype: caseSubtype,
                          summary: summary,
                          file: result.secure_url,
                          // Use the Cloudinary URL
                          caseOwner: caseOwner,
                          userId: userId
                        });
                      case 6:
                        registeredCase = _context.sent;
                        return _context.abrupt("return", res.status(200).json({
                          data: registeredCase,
                          message: "Case registered successfully"
                        }));
                      case 8:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x3, _x4) {
                  return _ref.apply(this, arguments);
                };
              }());
              _context2.next = 17;
              break;
            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](0);
              console.error("Error registering case:", _context2.t0);
              res.status(500).json({
                error: "Failed to register cases"
              });
            case 17:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 13]]);
      }));
      function registerCases(_x, _x2) {
        return _registerCases.apply(this, arguments);
      }
      return registerCases;
    }() // get all cases
  }, {
    key: "getCases",
    value: function () {
      var _getCases = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
        var allCases;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _caseModel["default"].find();
            case 3:
              allCases = _context3.sent;
              return _context3.abrupt("return", res.status(200).json({
                data: allCases,
                message: "allCases"
              }));
            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);
              return _context3.abrupt("return", res.status(500).json({
                message: "Failed to access to db please check again"
              }));
            case 11:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 7]]);
      }));
      function getCases(_x5, _x6) {
        return _getCases.apply(this, arguments);
      }
      return getCases;
    }()
  }, {
    key: "getCasesById",
    value: function () {
      var _getCasesById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
        var userId, caseByUserId;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              userId = req.params.userId; // Ensure the parameter passed to find() is an object
              _context4.next = 4;
              return _caseModel["default"].find({
                userId: userId
              });
            case 4:
              caseByUserId = _context4.sent;
              console.log(req.params.caseOwner, "email  fro token");
              return _context4.abrupt("return", res.status(200).json({
                data: caseByUserId,
                message: "this all cases you submitted"
              }));
            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);
              return _context4.abrupt("return", res.status(500).json({
                message: "failed to acess to db"
              }));
            case 13:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 9]]);
      }));
      function getCasesById(_x7, _x8) {
        return _getCasesById.apply(this, arguments);
      }
      return getCasesById;
    }() // get cases by assigned to
  }, {
    key: "caseByAssigned",
    value: function () {
      var _caseByAssigned = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
        var assignedTo, assignedCase;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              assignedTo = req.params.assignedTo;
              _context5.next = 4;
              return _caseModel["default"].find({
                assignedTo: assignedTo
              });
            case 4:
              assignedCase = _context5.sent;
              return _context5.abrupt("return", res.status(200).json({
                data: assignedCase,
                message: "Your assigned case is this"
              }));
            case 8:
              _context5.prev = 8;
              _context5.t0 = _context5["catch"](0);
              console.log(_context5.t0);
              return _context5.abrupt("return", res.status(500).json({
                message: "Failed to get cases of assignedTo"
              }));
            case 12:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 8]]);
      }));
      function caseByAssigned(_x9, _x10) {
        return _caseByAssigned.apply(this, arguments);
      }
      return caseByAssigned;
    }() // get single cases
  }, {
    key: "getSingleCase",
    value: function () {
      var _getSingleCase = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
        var singleCase;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _caseModel["default"].findOne({
                _id: req.params.id
              });
            case 3:
              singleCase = _context6.sent;
              return _context6.abrupt("return", res.status(200).json({
                data: singleCase,
                message: "Single Case"
              }));
            case 7:
              _context6.prev = 7;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", res.status(400).json({
                message: "User case not found"
              }));
            case 10:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 7]]);
      }));
      function getSingleCase(_x11, _x12) {
        return _getSingleCase.apply(this, arguments);
      }
      return getSingleCase;
    }()
  }, {
    key: "updateSingleCase",
    value: function () {
      var _updateSingleCase = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
        var _req$body2, caseType, caseSubtype, summary, file, caseFound;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _req$body2 = req.body, caseType = _req$body2.caseType, caseSubtype = _req$body2.caseSubtype, summary = _req$body2.summary, file = _req$body2.file;
              _context7.next = 4;
              return _caseModel["default"].findOne({
                _id: req.params.id
              });
            case 4:
              caseFound = _context7.sent;
              if (caseType) {
                caseFound.caseType = caseType;
              }
              if (caseSubtype) {
                caseFound.caseSubtype = caseSubtype;
              }
              if (summary) {
                caseFound.summary = summary;
              }
              if (file) {
                caseFound.file = file;
              }
              caseFound.updatedAt = new Date();
              _context7.next = 12;
              return caseFound.save();
            case 12:
              return _context7.abrupt("return", res.status(200).json({
                status: "sucess",
                message: "case updated successfully",
                data: caseFound
              }));
            case 15:
              _context7.prev = 15;
              _context7.t0 = _context7["catch"](0);
              return _context7.abrupt("return", res.status(500).json({
                status: "internal server error",
                error: _context7.t0.message
              }));
            case 18:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 15]]);
      }));
      function updateSingleCase(_x13, _x14) {
        return _updateSingleCase.apply(this, arguments);
      }
      return updateSingleCase;
    }()
  }, {
    key: "deleteSingleCase",
    value: function () {
      var _deleteSingleCase = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
        var deleteCase;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return _caseModel["default"].deleteOne({
                _id: req.params.id
              });
            case 3:
              deleteCase = _context8.sent;
              return _context8.abrupt("return", res.status(200).json({
                data: deleteCase,
                message: "deleted data"
              }));
            case 7:
              _context8.prev = 7;
              _context8.t0 = _context8["catch"](0);
              return _context8.abrupt("return", res.status(500).json({
                status: "internal server error",
                error: _context8.t0.message
              }));
            case 10:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 7]]);
      }));
      function deleteSingleCase(_x15, _x16) {
        return _deleteSingleCase.apply(this, arguments);
      }
      return deleteSingleCase;
    }()
  }, {
    key: "markAsDoneArchived",
    value: function () {
      var _markAsDoneArchived = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
        var _markAsDoneArchived2, caseFound;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _markAsDoneArchived2 = req.body.markAsDoneArchived;
              _context9.next = 4;
              return _caseModel["default"].findOne({
                _id: req.params.id
              });
            case 4:
              caseFound = _context9.sent;
              if (caseFound) {
                caseFound.markAsDoneArchived = _markAsDoneArchived2;
              }
              caseFound.updatedAt = new Date();
              _context9.next = 9;
              return caseFound.save();
            case 9:
              return _context9.abrupt("return", res.status(200).json({
                status: "sucess",
                message: "case marked as ".concat(caseFound.markedAsDoneArchived, " successfully"),
                data: caseFound
              }));
            case 12:
              _context9.prev = 12;
              _context9.t0 = _context9["catch"](0);
              return _context9.abrupt("return", res.status(500).json({
                status: "internal server error",
                error: _context9.t0.message
              }));
            case 15:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[0, 12]]);
      }));
      function markAsDoneArchived(_x17, _x18) {
        return _markAsDoneArchived.apply(this, arguments);
      }
      return markAsDoneArchived;
    }()
  }, {
    key: "status",
    value: function () {
      var _status = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
        var _status2, caseFound;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _status2 = req.body.status;
              _context10.next = 4;
              return _caseModel["default"].findOne({
                _id: req.params.id
              });
            case 4:
              caseFound = _context10.sent;
              if (caseFound) {
                caseFound.status = _status2;
              }
              caseFound.updatedAt = new Date();
              _context10.next = 9;
              return caseFound.save();
            case 9:
              return _context10.abrupt("return", res.status(200).json({
                status: "sucess",
                message: "case marked as ".concat(caseFound.status, " successfully"),
                data: caseFound
              }));
            case 12:
              _context10.prev = 12;
              _context10.t0 = _context10["catch"](0);
              return _context10.abrupt("return", res.status(500).json({
                status: "internal server error",
                error: _context10.t0.message
              }));
            case 15:
            case "end":
              return _context10.stop();
          }
        }, _callee10, null, [[0, 12]]);
      }));
      function status(_x19, _x20) {
        return _status.apply(this, arguments);
      }
      return status;
    }()
  }, {
    key: "assigningCase",
    value: function () {
      var _assigningCase = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
        var assignedTo, caseFound;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              assignedTo = req.body.assignedTo;
              _context11.next = 4;
              return _caseModel["default"].findOne({
                _id: req.params.id
              });
            case 4:
              caseFound = _context11.sent;
              if (caseFound) {
                caseFound.assignedTo = assignedTo;
              }
              caseFound.updatedAt = new Date();
              _context11.next = 9;
              return caseFound.save();
            case 9:
              return _context11.abrupt("return", res.status(200).json({
                status: "sucess",
                message: "case marked as ".concat(caseFound.assignedTo, " successfully"),
                data: caseFound
              }));
            case 12:
              _context11.prev = 12;
              _context11.t0 = _context11["catch"](0);
              return _context11.abrupt("return", res.status(500).json({
                status: "internal server error",
                error: _context11.t0.message
              }));
            case 15:
            case "end":
              return _context11.stop();
          }
        }, _callee11, null, [[0, 12]]);
      }));
      function assigningCase(_x21, _x22) {
        return _assigningCase.apply(this, arguments);
      }
      return assigningCase;
    }()
  }, {
    key: "exportCaseToPDFById",
    value: function () {
      var _exportCaseToPDFById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
        var id, caseData, directoryPath, doc, filePath;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.prev = 0;
              id = req.params.id;
              _context12.next = 4;
              return _caseModel["default"].findOne({
                _id: id
              });
            case 4:
              caseData = _context12.sent;
              if (caseData) {
                _context12.next = 7;
                break;
              }
              return _context12.abrupt("return", res.status(404).json({
                error: "Case not found"
              }));
            case 7:
              directoryPath = "./exports";
              if (!_fs["default"].existsSync(directoryPath)) {
                _fs["default"].mkdirSync(directoryPath);
              }
              doc = new _pdfkit["default"]();
              filePath = _path["default"].join(directoryPath, "case_".concat(id, ".pdf"));
              doc.pipe(_fs["default"].createWriteStream(filePath));
              doc.fontSize(25).text("Case Report", {
                align: "center"
              });
              doc.fontSize(12).text("Case ID: ".concat(caseData.id), {
                underline: true
              }).moveDown().text("Type: ".concat(caseData.caseType)).text("Subtype: ".concat(caseData.caseSubtype)).text("Summary: ".concat(caseData.summary)).text("Owner: ".concat(caseData.caseOwner)).moveDown();
              doc.end();

              // Wait for the PDF to be written to disk before sending the response
              doc.on("finish", function () {
                res.setHeader("Content-Disposition", "attachment; filename=\"case_".concat(id, ".pdf\""));
                res.download(filePath, function (err) {
                  if (err) {
                    console.error("Error downloading file:", err);
                    res.status(500).json({
                      error: "Failed to download PDF"
                    });
                  } else {
                    _fs["default"].unlink(filePath, function (err) {
                      if (err) {
                        console.error("Error deleting file:", err);
                      }
                    });
                  }
                });
              });
              _context12.next = 22;
              break;
            case 18:
              _context12.prev = 18;
              _context12.t0 = _context12["catch"](0);
              console.error("Error exporting to PDF:", _context12.t0);
              res.status(500).json({
                error: "Failed to export to PDF",
                message: _context12.t0.message
              });
            case 22:
            case "end":
              return _context12.stop();
          }
        }, _callee12, null, [[0, 18]]);
      }));
      function exportCaseToPDFById(_x23, _x24) {
        return _exportCaseToPDFById.apply(this, arguments);
      }
      return exportCaseToPDFById;
    }()
  }]);
}();
var _default = exports["default"] = casesCotroller;