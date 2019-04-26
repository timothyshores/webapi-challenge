const express = require('express');

const postsRouter = require('./actions/actionsRouter');
const usersRouter = require('./projects/projectsRouter');

const server = express();

// Configure global middleware
server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
    <h2>Web 18 - Web API Sprint Challenge </h2>
    `);
});

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

module.exports = server;
