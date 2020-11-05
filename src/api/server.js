const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const {logger}= require("../utils");
const userRouter = require("../users")
const productRouter = require("../products")

const server = express();
server.use(express.json());
server.use(
  cors({
    origin: [`${process.env.FRONT_URL}`],
    credentials: true,
  })
);
server.use(cookieParser());
server.use(helmet());
server.use(express.urlencoded({ extended: true }));
server.use(compression());
server.use(morgan("combined", {stream: logger.stream}));

server.get("/", (req, res) =>
  res.status(200).json({
    status: 200,
    message: "Dixst Deliverable is up ...",
  })
);
server.use("/users", userRouter)
server.use("/products", productRouter)
server.use("*", (req, res) =>
  res.status(404).json({
    status: 404,
    message: "No endpoint matches that URL.",
  })
);

module.exports = server;
