const express = require("express");
const router = express.Router();

const projectModel = require("../data/helpers/projectModel");
const validateProjectId = require("../middleware/validateProjectId");
const validateProject = require("../middleware/validateProject");

router.get("/", (req, res) => {
  try {
    projectModel.get().then((projects) => {
      return res.status(200).json(projects);
    });
  } catch (err) {
    return res.status(500).json({ message: "Error retrieving projects data" });
  }
});

router.get("/:id", validateProjectId(), (req, res) => {
  res.status(200).json(req.projects);
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
    return res.status(500).json({ message: "Error creating new project" });
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
    return res.status(500).json({ message: "Error updating project" });
  }
});

router.delete("/:id", validateProjectId(), (req, res) => {
  try {
    projectModel.remove(req.params.id).then((project) => {
      return res.status(200).json({ project });
    });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting project" });
  }
});

module.exports = router;
