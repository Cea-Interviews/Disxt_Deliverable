const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { logger } = require("../utils");
const userRouter = require("../users");
const productRouter = require("../products");
const db = require("../config/db");

db()
const server = express();
server.use(express.json());
server.use(
  cors({
    origin: [`${process.env.FRONT_URL}`, "localhost:5000"],
    credentials: true,
  })
);
server.use(cookieParser());
server.use(helmet());
server.use(express.urlencoded({ extended: true }));
server.use(compression());
server.use(morgan("combined", { stream: logger.stream }));

server.get("/", (req, res) =>
  res.status(200).json({
    status: 200,
    message: "Dixst Deliverable is up ...",
  })
);
server.use("/api/v1", userRouter);
server.use("/api/v1/products", productRouter)
server.use("*", (req, res) =>
  res.status(404).json({
    status: 404,
    message: "No endpoint matches that URL.",
  })
);

module.exports = server;
