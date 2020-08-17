const express = require("express");
const logger = require("../middleware/logger");
const actions = require("../actions/actions.js");
const projects = require("../projects/projects.js");

const server = express();
server.use(express.json());
server.use(logger());

server.use("/api/projects", projects);
server.use("/api/actions", actions);

server.get("/", (req, res) => {
  res.send(`Shit works yo`);
});

module.exports = server;
