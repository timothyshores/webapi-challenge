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

module.exports = actionsRouter;