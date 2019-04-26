const express = require('express');
const Projects = require('./projectModel');
const projectsRouter = express.Router();

projectsRouter.get('/', (req, res) => {
    const message500 = { error: "The projects information could not be retrieved." };

    Projects
        .get()
        .then(projects => { res.status(200).json(projects) })
        .catch(err => {
            res.status(500).json(message500);
        })
});

projectsRouter.get('/:id', (req, res) => {
    const message404 = { error: "The project with the specified ID does not exist." }
    const message500 = { error: "The project information could not be retrieved." }

    Projects
        .get(req.params.id)
        .then(project => {
            project
                ? res.status(200).json(project)
                : res.status(404).json(message404);
        })
        .catch(err => { res.status(500).json(message500) })
});

module.exports = projectsRouter;