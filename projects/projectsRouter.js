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

module.exports = projectsRouter;