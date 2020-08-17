const express = require("express");
const router = express.Router();

const actionModel = require("../data/helpers/actionModel");
const { validateActionId } = require("../middleware/validateActionId");
const { validateAction } = require("../middleware/validateAction");
const { orWhereNotExists } = require("../data/dbConfig");

router.get("/", (req, res) => {
  try {
    actionModel.get().then((action) => res.status(200).json(action));
  } catch (err) {
    return res.status(500).json({ message: "Error getting actions data" });
  }
});

router.get("/:id", validateActionId(), (req, res) => {
  res.status(200).json(req.action);
});

router.post("/", validateAction(), (req, res) => {
  try {
    const newAction = {
      project_id: req.body.project_id,
      description: req.body.description,
      notes: req.body.notes,
    };

    actionModel.insert(newAction).then((action) => {
      return res.status(201).json(action);
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validateActionId(), validateAction(), (req, res) => {
  try {
    const updateAction = {
      project_id: req.body.project_id,
      description: req.body.description,
      notes: req.body.notes,
      completed: req.body.completed || req.action.completed,
    };

    actionModel.update(req.params.id, updateAction).then((action) => {
      return res.status(200).json(action);
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", validateActionId(), (req, res) => {
  try {
    actionModel.remove(req.params.id).then((action) => {
      return res.status(200).json({ action });
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
