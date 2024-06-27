"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cors = _interopRequireDefault(require("cors"));
var _connection = _interopRequireDefault(require("./database/connection.js"));
var _usersRoutes = _interopRequireDefault(require("./routes/usersRoutes.js"));
var _casesRoute = _interopRequireDefault(require("./routes/casesRoute.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json()); // Use express.json() instead of bodyParser.json()

app.use('/users', _usersRoutes["default"]);
app.use('/cases', _casesRoute["default"]);
app.get("/", function (req, res) {
  res.status(200).send("Welcome to my API");
});
app.get("*", function (req, res) {
  res.status(404).send("Page is not found");
});
var port = process.env.PORT || 3002;
app.listen(port, function () {
  console.log("Server is listening on port ".concat(port));
});