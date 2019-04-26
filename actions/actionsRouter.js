const express = require('express');
const Actions = require('./actionModel');
const Projects = require('../projects/projectModel')
const actionsRouter = express.Router();

actionsRouter.get('/', (req, res) => {
    const message500 = { error: "The actions information could not be retrieved." };

    Actions
        .get()
        .then(actions => { res.status(200).json(actions) })
        .catch(err => {
            res.status(500).json(message500);
        })
});

actionsRouter.get('/:id', (req, res) => {
    const message404 = { error: "The action with the specified ID does not exist." }
    const message500 = { error: "The action information could not be retrieved." }

    Actions
        .get(req.params.id)
        .then(project => {
            project
                ? res.status(200).json(project)
                : res.status(404).json(message404);
        })
        .catch(err => { res.status(500).json(message500) })
});

actionsRouter.post('/', (req, res) => {
    const { project_id, description, notes } = req.body;
    const message400 = { error: "Please provide project_id, description and notes for the action." }
    const message500 = { error: "There was an error while saving the action to the database" };

    if (project_id && description && notes) {
        Actions
            .insert({ project_id, description, notes })
            .then(action => { res.status(201).json(action) })
            .catch(err => { res.status(500).json(message500) })
    }
    else {
        res.status(400).json(message400);
    }
});

module.exports = actionsRouter;