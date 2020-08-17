const express = require("express");
const router = express.Router();

const projectModel = require("../data/helpers/projectModel");
const { validateProjectId } = require("../middleware/validateProjectId");
const { validateProject } = require("../middleware/validateProject");

router.get("/", (req, res) => {
  try {
    projectModel.get().then((projects) => {
      return res.status(200).json(projects);
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateProjectId(), (req, res) => {
  try {
    projectModel.get(req.params.id).then((project) => {
      res.status(200).json(project);
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", validateProject(), (req, res) => {
  try {
    const newProject = {
      name: req.body.name,
      description: req.body.description,
    };

    projectModel.insert(newProject).then((project) => {
      return res.status(201).json(project);
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validateProjectId(), validateProject(), (req, res) => {
  try {
    const updateProject = {
      name: req.body.name,
      description: req.body.description,
    };

    projectModel.update(req.params.id, updateProject).then((project) => {
      return res.status(202).json(project);
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", validateProjectId(), (req, res) => {
  try {
    projectModel.remove(req.params.id).then(() => {
      return res.status(200).json({ project: req.project });
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
