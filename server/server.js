const express = require("express");
const logger = require("../middleware/logger");
const projectsRouter = require("../projects/projects");
const actionsRouter = require("../actions/actions");

const server = express();
server.use(express.json());
server.use(logger());

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send(`Server is running`);
});

module.exports = server;
