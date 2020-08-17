const express = require("express");
const logger = require("../middleware/logger");
const projects = require("../projects/projects");
const actions = require("../actions/actions");

const server = express();
server.use(express.json());
server.use(logger());

server.use(projects);
server.use(actions);

server.get("/", (req, res) => {
  res.send(`Server is running`);
});

module.exports = server;
