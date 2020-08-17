function validateAction() {
  return (req, res, next) => {
    errorMessage = null;

    if (!req.body) {
      errorMessage = "Action data is missing";
    } else if (!req.body.project_id) {
      errorMessage = "Project_id is missing";
    } else if (!req.body.description) {
      errorMessage = "Action description is missing";
    } else if (req.body.description && req.body.description.length > 128) {
      errorMessage = "Action description is too long";
    } else if (!req.body.notes) {
      errorMessage = "Action notes are missing";
    }

    if (errorMessage) {
      return res.status(400).json({ message: errorMessage });
    }

    next();
  };
}
module.exports = { validateAction };
