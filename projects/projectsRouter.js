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

projectsRouter.post('/', (req, res) => {
    const { name, description } = req.body;
    const message400 = { error: "Please provide name and description for the project." }
    const message500 = { error: "There was an error while saving the project to the database" };

    if (name && description) {
        Projects
            .insert({ name, description })
            .then(project => { res.status(201).json(project) })
            .catch(err => { res.status(500).json(message500) })
    }
    else {
        res.status(400).json(message400);
    }
});

projectsRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    const message200 = { error: `Project id: ${id} was successfully deleted` };
    const message404 = { error: `Project id:${id} does not exist.` };
    const message500 = { error: `Project id:${id} could not be removed` };

    Projects
        .remove(id)
        .then(response => {
            response === 1
                ? res.status(200).json(message200)
                : res.status(404).json(message404)
        })
        .catch(error => {
            res.status(500).json(message500);
        });
});

projectsRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, completed } = req.body;

    const message400 = { error: `Please provide a valid name, description and completed status for post id: ${id}` };
    const message404 = { error: `Project id: ${id} does not exist` };
    const message500 = { error: `Project id: ${id} could not be removed` };

    (name === '' || description === '' || completed === '')
        ? res.status(400).json(message400)
        : Projects
            .update(id, { name, description, completed })
            .then(response => {
                projects === null
                    ? res.status(404).json(message404)
                    : res.status(200).json(response);
            })
            .catch(error => { res.status(500).json(message500) });
});

module.exports = projectsRouter;