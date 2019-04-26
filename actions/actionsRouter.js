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

module.exports = actionsRouter;