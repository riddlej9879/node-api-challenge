const projectModel = require("../data/helpers/projectModel");

function validateProjectId() {
  return (req, res, next) => {
    projectModel
      .get(req.params.id)
      .then((project) => {
        if (project) {
          req.project = project;
          next();
        } else {
          res.status(404).json({ message: "Invalid project id" });
        }
      })
      .catch(next);
  };
}

module.exports = { validateProjectId };
