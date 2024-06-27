"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _casesController = _interopRequireDefault(require("../controllers/casesController.js"));
var _multer = _interopRequireDefault(require("multer"));
var _authmiddleware = _interopRequireDefault(require("../middleware/authmiddleware.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var casesRoute = _express["default"].Router();
var storage = _multer["default"].diskStorage({
  // destination: (req, file, cb) => {
  //   cb(null, "src/documents");
  // },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = (0, _multer["default"])({
  storage: storage
});

// resgister cases
casesRoute.post("/register", upload.single("file"), _authmiddleware["default"].isAuthenticated, _casesController["default"].registerCases);
// get all cases
casesRoute.get("/", _authmiddleware["default"].isAuthenticated, _authmiddleware["default"].checkAdminRole, _casesController["default"].getCases);
casesRoute.get("/:userId", _authmiddleware["default"].isAuthenticated, _casesController["default"].getCasesById);
// get single cases
casesRoute.get("/singleCase/:id", _authmiddleware["default"].isAuthenticated, _casesController["default"].getSingleCase);
casesRoute.get("/assignedTo/:assignedTo", _authmiddleware["default"].isAuthenticated, _casesController["default"].caseByAssigned);
casesRoute.put("/:id", _authmiddleware["default"].isAuthenticated, _authmiddleware["default"].checkClientRole, _authmiddleware["default"].checkAdminRole, _casesController["default"].updateSingleCase);
casesRoute["delete"]("/:id", _authmiddleware["default"].isAuthenticated,
// authMiddleware.checkClientRole,
_authmiddleware["default"].checkAdminRole, _casesController["default"].deleteSingleCase);
// mark as done or archive
casesRoute.patch("/:id", _authmiddleware["default"].isAuthenticated, _authmiddleware["default"].checkAdminRole, _casesController["default"].markAsDoneArchived);
// change status
casesRoute.patch("/status/:id", _authmiddleware["default"].isAuthenticated, _authmiddleware["default"].checkAdminRole, _casesController["default"].status);
// assigning case
casesRoute.patch("/assigning/:id", _authmiddleware["default"].isAuthenticated, _authmiddleware["default"].checkAdminRole, _casesController["default"].assigningCase);
//exporting pdf
casesRoute.get('/pdf/:id', _casesController["default"].exportCaseToPDFById);
var _default = exports["default"] = casesRoute;