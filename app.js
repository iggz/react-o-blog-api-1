const express = require("express"),
  path = require("path"),
  cookieParser = require("cookie-parser"),
  logger = require("morgan"),
  cors = require("cors");

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept"
};

var indexRouter = require("./routes/r_index");
var version1Router = require("./routes/r_version1");
var authorRouter = require("./routes/r_authors");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(corsOptions));

app.use("/", indexRouter);
app.use("/v1", version1Router);
app.use("/a1", authorRouter);

module.exports = app;
