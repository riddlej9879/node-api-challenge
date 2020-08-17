const actionModel = require("../data/helpers/actionModel");

function validateActionId() {
  return (req, res, next) => {
    actionModel
      .get(req.params.id)
      .then((action) => {
        if (action) {
          req.action = action;
          next();
        } else {
          res.status(404).json({ message: "Invalid action id" });
        }
      })
      .catch(next);
  };
}

module.exports = { validateActionId };
