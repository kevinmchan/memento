import config from "./config";
import apiRouter from "./api";

import sassMiddleware from "node-sass-middleware";
import path from "path";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

/* create server object */
const server = express();
server.use(cors())
server.use(bodyParser.urlencoded({ extended: true }))
/* use sass middleware to convert sass to css */
server.use(
  sassMiddleware({
    src: path.join(__dirname, "sass"),
    dest: path.join(__dirname, "public"),
  })
);

/* use ejs to render index file */
server.set("view engine", "ejs");

/* make api router accessible */
server.use("/api", apiRouter);

/* make dest public folder accessible */
server.use(express.static("public"));

/* route root to index file */
server.get("/", (req, res) => {
  res.render("index");
});

/* listen on configured port */
server.listen(config.port, config.host, () => {
  console.info("Express listening on port", config.port);
});
