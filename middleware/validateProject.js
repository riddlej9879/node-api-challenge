function validateProject() {
  return (req, res, next) => {
    errorMessage = null;

    if (!req.body) {
      errorMessage = "Project data is missing";
    } else if (!req.body.name) {
      errorMessage = "Project name is missing";
    } else if (!req.body.description) {
      errorMessage = "Project description is missing";
    }

    if (errorMessage) {
      return res.status(400).json({ message: errorMessage });
    }

    next();
  };
}
module.exports = { validateProject };
