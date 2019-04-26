const express = require('express');
const Actions = require('./actionModel');
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

actionsRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    const message200 = { error: `Action id: ${id} was successfully deleted` };
    const message404 = { error: `Action id:${id} does not exist.` };
    const message500 = { error: `Action id:${id} could not be removed` };

    Actions
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

actionsRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const { project_id, description, notes, completed } = req.body;

    const message400 = { error: `Please provide a valid project_id, description, notes and completed status for action id: ${id}` };
    const message404 = { error: `Action id: ${id} does not exist` };
    const message500 = { error: `Action id: ${id} could not be updated` };

    (project_id === '' || description === '' || notes === '' || completed === '')
        ? res.status(400).json(message400)
        : Actions
            .update(id, { project_id, description, notes, completed })
            .then(action => {
                action === null
                    ? res.status(404).json(message404)
                    : res.status(200).json(action);
            })
            .catch(error => { res.status(500).json(message500) });
});

module.exports = actionsRouter;